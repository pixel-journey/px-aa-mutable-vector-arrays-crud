/**
 * AtomicAssets vector mutable attributes (educational).
 * INT64_VEC, UINT64_VEC, STRING_VEC: push, erase, bounds.
 * No live AtomicAssets. No wasm. No setassetdata broadcast.
 */

export type VecKind = "int64_vec" | "uint64_vec" | "string_vec";

export type Int64Vec = { kind: "int64_vec"; value: readonly bigint[] };
export type Uint64Vec = { kind: "uint64_vec"; value: readonly bigint[] };
export type StringVec = { kind: "string_vec"; value: readonly string[] };
export type VecValue = Int64Vec | Uint64Vec | StringVec;

export type AttrMap = Readonly<Record<string, VecValue>>;

export const MAX_VEC_LEN = 64;
export const MAX_STRING_ELEM = 256;
export const INT64_MIN = -9223372036854775808n;
export const INT64_MAX = 9223372036854775807n;
export const UINT64_MAX = 18446744073709551615n;

const KEY = /^[a-z][a-z0-9_]{0,31}$/;

export function assertKey(key: string): string {
  if (!KEY.test(key)) throw new Error("bad key");
  return key;
}

function assertInt64(n: bigint): bigint {
  if (typeof n !== "bigint") throw new Error("need bigint");
  if (n < INT64_MIN || n > INT64_MAX) throw new Error("out of range");
  return n;
}

function assertUint64(n: bigint): bigint {
  if (typeof n !== "bigint") throw new Error("need bigint");
  if (n < 0n || n > UINT64_MAX) throw new Error("out of range");
  return n;
}

function assertStringElem(s: string): string {
  if (typeof s !== "string") throw new Error("need string");
  if (s.length > MAX_STRING_ELEM) throw new Error("string too long");
  return s;
}

export function emptyVec(kind: VecKind): VecValue {
  if (kind === "int64_vec") return { kind, value: [] };
  if (kind === "uint64_vec") return { kind, value: [] };
  return { kind: "string_vec", value: [] };
}

export function ensureVec(map: AttrMap, key: string, kind: VecKind): AttrMap {
  assertKey(key);
  const existing = map[key];
  if (existing) {
    if (existing.kind !== kind) throw new Error("kind mismatch");
    return map;
  }
  return { ...map, [key]: emptyVec(kind) };
}

export function push(
  map: AttrMap,
  key: string,
  kind: VecKind,
  elem: bigint | string,
): AttrMap {
  assertKey(key);
  let row = map[key];
  if (!row) {
    row = emptyVec(kind);
  } else if (row.kind !== kind) {
    throw new Error("kind mismatch");
  }
  if (row.value.length >= MAX_VEC_LEN) throw new Error("vec full");

  if (kind === "int64_vec") {
    if (typeof elem !== "bigint") throw new Error("type mismatch");
    const v = assertInt64(elem);
    return { ...map, [key]: { kind, value: [...(row.value as readonly bigint[]), v] } };
  }
  if (kind === "uint64_vec") {
    if (typeof elem !== "bigint") throw new Error("type mismatch");
    const v = assertUint64(elem);
    return { ...map, [key]: { kind, value: [...(row.value as readonly bigint[]), v] } };
  }
  if (typeof elem !== "string") throw new Error("type mismatch");
  const s = assertStringElem(elem);
  return {
    ...map,
    [key]: { kind: "string_vec", value: [...(row.value as readonly string[]), s] },
  };
}

export function eraseAt(map: AttrMap, key: string, index: number): AttrMap {
  assertKey(key);
  const row = map[key];
  if (!row) throw new Error("missing key");
  if (!Number.isInteger(index) || index < 0 || index >= row.value.length) {
    throw new Error("bad index");
  }
  const next = row.value.slice(0, index).concat(row.value.slice(index + 1));
  if (row.kind === "int64_vec") {
    return { ...map, [key]: { kind: "int64_vec", value: next as bigint[] } };
  }
  if (row.kind === "uint64_vec") {
    return { ...map, [key]: { kind: "uint64_vec", value: next as bigint[] } };
  }
  return { ...map, [key]: { kind: "string_vec", value: next as string[] } };
}

export function clear(map: AttrMap, key: string): AttrMap {
  assertKey(key);
  const row = map[key];
  if (!row) throw new Error("missing key");
  return { ...map, [key]: emptyVec(row.kind) };
}

export function len(map: AttrMap, key: string): number {
  const row = map[key];
  return row ? row.value.length : 0;
}
