export const API_KEY="AIzaSyBCAyhQqRN1HkpbGIsf28Ord0x8sYFn3cc";

export const value_converter=(value)=>{
if(value>=1000000){
    return Math.floor(value/1000000)+"M";
}
else if(value>=1000){
    return Math.floor(value/1000)+"K";
}
else{
    return value
}
}