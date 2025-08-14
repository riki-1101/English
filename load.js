let data = [];
document.addEventListener("DOMContentLoaded", function () {
    loadData();
});

// JSONを読み込む
const main = document.getElementById("main");
var filename = main.className;
function loadData() {
    fetch(`../json/${filename}.json`)
        .then(response => response.json())
        .then(json => {
            data = json;
            filterList();
        })
        .catch(error => console.error("JSON の読み込みエラー:", error));
}

// フィルタ
function filterList() {
    const selectedCategory = document.getElementById("filter1").value; // 行為 / 何か
    const selectedTense = document.getElementById("filter2").value;    // 現在 / 過去

    const listElement = document.getElementById("list");
    listElement.innerHTML = "";

    // 保存したデータを取得
    const storedData = localStorage.getItem("selectedData");
    let storedPhrase = "";
    if (storedData) {
        try {
            const parsed = JSON.parse(storedData);
            storedPhrase = parsed.phrase;
            storedMeaning = parsed.meaning;
            storedTense = parsed.tense;
        } catch (e) {
            console.error("保存データのパースエラー:", e);
        }
    }
    // JSONからカテゴリでフィルタ
    const filteredData = data.filter(item => item.type === selectedCategory);

    // 表示
    filteredData.forEach(item => {
        const li = document.createElement("li");
        const phraseKey = `phrase-${selectedTense}`;
        const meaningKey = `meaning-${selectedTense}`;

        // ローカルのphrase + JSONのphrase を連結
        li.textContent = `${storedPhrase} ${item[phraseKey]}`;
        li.className = "list-item";
        listElement.appendChild(li);

        // モーダル表示処理
        li.onclick = function () {
            document.getElementById("phrase").textContent = `${storedPhrase} ${item[phraseKey]}`;
            document.getElementById("meaning").textContent = `${item[meaningKey]}${storedMeaning}`;
            document.getElementById("popup").style.display = "flex";
        };

        listElement.appendChild(li);

    });
}

// 背景クリックで閉じる
document.getElementById("popup").addEventListener("click", function (event) {
// popup-contentの外側がクリックされた場合のみ閉じる
if (event.target === this) {
    this.style.display = "none";
}
});