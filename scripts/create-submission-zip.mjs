import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const version = pkg.version;
const outDir = path.join(root, "dist");
const outFile = path.join(outDir, `dyslex.ai-${version}.zip`);
const sources = [".codex-plugin", "assets", "skills"];

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosDate, dosTime };
}

function collectFiles(relativePath) {
  const absolutePath = path.join(root, relativePath);
  const info = statSync(absolutePath);
  if (info.isFile()) return [relativePath];
  const files = [];
  for (const entry of readdirSync(absolutePath)) {
    files.push(...collectFiles(path.join(relativePath, entry)));
  }
  return files;
}

function uint16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function uint32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value);
  return buffer;
}

function stringBuffer(value) {
  return Buffer.from(value.replaceAll(path.sep, "/"), "utf8");
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const localParts = [];
const centralParts = [];
let offset = 0;

const files = sources.flatMap(collectFiles).sort();

for (const relativePath of files) {
  const absolutePath = path.join(root, relativePath);
  const content = readFileSync(absolutePath);
  const name = stringBuffer(relativePath);
  const { dosDate, dosTime } = dosDateTime(statSync(absolutePath).mtime);
  const checksum = crc32(content);

  const localHeader = Buffer.concat([
    uint32(0x04034b50),
    uint16(20),
    uint16(0),
    uint16(0),
    uint16(dosTime),
    uint16(dosDate),
    uint32(checksum),
    uint32(content.length),
    uint32(content.length),
    uint16(name.length),
    uint16(0),
    name
  ]);

  localParts.push(localHeader, content);

  centralParts.push(
    Buffer.concat([
      uint32(0x02014b50),
      uint16(20),
      uint16(20),
      uint16(0),
      uint16(0),
      uint16(dosTime),
      uint16(dosDate),
      uint32(checksum),
      uint32(content.length),
      uint32(content.length),
      uint16(name.length),
      uint16(0),
      uint16(0),
      uint16(0),
      uint16(0),
      uint32(0),
      uint32(offset),
      name
    ])
  );

  offset += localHeader.length + content.length;
}

const centralDirectory = Buffer.concat(centralParts);
const endOfCentralDirectory = Buffer.concat([
  uint32(0x06054b50),
  uint16(0),
  uint16(0),
  uint16(files.length),
  uint16(files.length),
  uint32(centralDirectory.length),
  uint32(offset),
  uint16(0)
]);

writeFileSync(outFile, Buffer.concat([...localParts, centralDirectory, endOfCentralDirectory]));

console.log(outFile);
