
const numItemsElement = document.getElementById("numItems");
const lengthOfStringsElement = document.getElementById("lengthOfString");
const collectionNameElement = document.getElementById("collectionName");

const alphabetElement = document.getElementById("alphabet");
const prefixElement = document.getElementById("prefix");
const suffixElement = document.getElementById("suffix");

const generateButton = document.getElementById("generate");

const outputElement = document.getElementById("output");


let alphabet = "ABCDEFGHIJKLMNPQRSTUVWXYZÆ_abcdefghijklmnopqrstuvxyz123456789"
alphabetElement.value = alphabet;


generateButton.addEventListener("click", () => {

    outputElement.innerHTML = "";

    const numItems = parseInt(numItemsElement.value) || 10;
    const lengthOfStrings = parseInt(lengthOfStringsElement.value);
    const collectionName = collectionNameElement.value;
    const prefix = prefixElement.value;
    const suffix = suffixElement.value;

    const fileTypes = document.querySelectorAll('input[type="checkbox"]:checked');

    alphabet = alphabetElement.value;

    console.log(`numItems: ${numItems}`);
    console.log(`lengthOfStrings: ${lengthOfStrings}`);
    console.log(`collectionName: ${collectionName}`);
    console.log(`prefix: ${prefix}`);
    console.log(`suffix: ${suffix}`);
    console.log(`alphabet: ${alphabet}`);
    console.log(`fileTypes: ${fileTypes}`);

    const createdItems = createListOfItems(numItems, lengthOfStrings, alphabet, prefix, suffix);

    console.log(createdItems);

    fileTypes.forEach(fileType => {

        console.log(fileType.value);

        switch (fileType.value) {
            case "json": console.log("Creating Json output file");
                createDownloadFile(JSON.stringify(createdItems), collectionName + ".json"); break;
            case "csv": console.log("Creating Csv output file");
                createDownloadFile(createdItems.join(";"), collectionName + ".csv"); break;
            case "txt": console.log("Creating Txt output file");
                createDownloadFile(createdItems.join("\n"), collectionName + ".txt"); break;
        }
    });


});

function createListOfItems(count, length, alphabet, prefix, suffix) {
    let ids = new Set();

    while (ids.size < count) {
        ids.add(prefix + createRandomAlphaNumericIdOfLength(length, alphabet) + suffix);
    }

    let output = Array.from(ids);
    return output;
}



function createRandomAlphaNumericIdOfLength(length, alphhabet) {
    let result = '';
    let characters = alphhabet;
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function createDownloadFile(content, filename) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.innerText = filename;
    //element.style.display = 'none';

    const li = document.createElement("li");
    li.appendChild(element);

    outputElement.appendChild(li);

    element.click();

    //document.body.removeChild(element);
}