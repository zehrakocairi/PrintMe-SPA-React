export function hasFlag(value:any, flag:any) {
    return (value & flag) === flag;
}

export function removeFlag(value:any, flag:any) {
    return value & ~flag;
}

export function addFlag(value:any, flag:any) {
    return value | flag;
}