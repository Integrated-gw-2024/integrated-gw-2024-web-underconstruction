//DurstenFeld Shuffle アルゴリズムによる配列シャッフル
export default function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * (i+1));
        [arr[i-1],arr[k]]=[arr[k],arr[i-1]];
    }
    return arr;
}
