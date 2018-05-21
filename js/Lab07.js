var button = document.getElementById("button");
var deleteIndex = new Array();
var isDelete;
var select2Index = 1;
var tables = new Array();
function func(){
    var attrInputDiv = document.getElementById("attrInputDiv");
    var deleteInputDiv = document.getElementById("deleteInputDiv");
    var warning = document.getElementById("warning");
    var divForInput = document.getElementById("divForInput");
    var index1 = document.getElementById("select1").selectedIndex;
    var button = document.getElementById("button");
    switch(index1){
        case 0:
           attrInputDiv.style.display = "none";
           deleteInputDiv.style.display = "none";
           divForInput.style.display = "none";
           button.style.display = "none";
           warning.style.display = "none";
           break;
        case 1:
            attrInputDiv.style.display = "none";
            deleteInputDiv.style.display = "none";
            warning.style.display = "none";
            button.style.display = "none";
            divForInput.style.display = "block";
            createTable();
            break;
        case 2:
            attrInputDiv.style.display = "block";
            deleteInputDiv.style.display = "none";
            warning.style.display = "none";
            divForInput.style.display = "none";
            showAttrInput();
            break;
        case 3:
            attrInputDiv.style.display = "none";
            warning.style.display = "none";
            divForInput.style.display = "none";
            deleteInputDiv.style.display = "block";
            deleteL();
            break;
        case 4:
            attrInputDiv.style.display = "none";
            deleteInputDiv.style.display = "none";
            divForInput.style.display = "none";
            warning.style.display = "block";
            warning.innerHTML = "WARNING: You cannot undo this action!";
            document.getElementById("div1").appendChild(warning);
            button.style.display = "block";
            break;
        default :
            break;
    }
}
function createTable() {
    var divUp = document.getElementById("div1");
    //create div for containing input boxes
    var divForInput = document.getElementById("divForInput");
    //create input for table name
    var inputTableName = document.createElement("input");
    inputTableName.setAttribute("id", "tableName");
    inputTableName.setAttribute("type", "text");
    inputTableName.setAttribute("placeholder", "Table Name");
    //create input for column number
    var inputColumns = document.createElement("input");
    inputColumns.setAttribute("id", "columnsNum");
    inputColumns.setAttribute("type", "number");
    inputColumns.setAttribute("placeholder", "Columns Numbers");

    divUp.appendChild(divForInput);
    divForInput.appendChild(inputTableName);
    divForInput.appendChild(inputColumns);

    var divForInputAttr = document.getElementById("divForInputAttr");
    var tableName = inputTableName.text;
    var colIndex = 0;
    var colsAll = 0;
    var colsArr = new Array();
    inputColumns.onchange = function () {
        colsArr[colIndex++] = inputColumns.value;
        if (colsArr[colIndex - 1] >= 0) {
            if (colsArr.length == 1) {
                for (var i = 0; i < inputColumns.value; i++) {
                    var inputAttrName = document.createElement("input");
                    inputAttrName.setAttribute("class", "attr");
                    inputAttrName.setAttribute("type", "text");
                    inputAttrName.setAttribute("placeholder", "Attribute");
                    divForInputAttr.appendChild(inputAttrName);
                    colsAll++;
                }
            }else {
                if (colsArr[colIndex - 1] - colsArr[colIndex - 2] >= 0 && colsArr[colIndex - 2] >= 0) {
                    for (var k = 0; k < colsArr[colIndex - 1] - colsArr[colIndex - 2]; k++) {
                        inputAttrName = document.createElement("input");
                        inputAttrName.setAttribute("class", "attr");
                        inputAttrName.setAttribute("type", "text");
                        inputAttrName.setAttribute("placeholder", "Attribute");
                        divForInputAttr.appendChild(inputAttrName);
                        colsAll++;
                    }
                }else if(colsArr[colIndex - 1] - colsArr[colIndex - 2] < 0){
                    for (var n = 0; n < colsArr[colIndex - 2] - colsArr[colIndex - 1]; n++){
                        var inputLists = document.getElementsByClassName("attr");
                        divForInputAttr.removeChild(inputLists[colsAll - 1]);
                        colsAll--;
                    }
                }
            }
        }else {
            divForInputAttr.setAttribute("display", "none");
        }
        divForInput.appendChild(divForInputAttr);
        if(tableName != "" && inputColumns.value > 0){
            button.style.display = "block";
        }
        else{
            button.style.display = "none";
        }
    };
    inputTableName.onchange = function(){
        if(tableName != "" && inputColumns.value > 0){
            button.style.display = "block";
        }
        else{
            button.style.display = "none";
        }
    };
}

function func1(){
    var index1  = document.getElementById("select1").selectedIndex;
    var cols = document.getElementById("columnsNum").value;
    if(index1 == 1){
            var select2 = document.getElementById("select2");
            var tableName = document.getElementById("tableName").value;
            if(tableName.value == ""){
                tableName = "table name";
            }
            select2.options.add(new Option(tableName, "0"),select2Index);
            select2.options[select2Index].selected = true;
            var nowTable = document.createElement("table");
            tables[select2Index] = nowTable;
            select2Index++;
            nowTable.setAttribute("id", "nowTable");
            for(var x = 0;x < 1; x++) {
                var tr = document.createElement("tr");
                for (var y = 0; y < cols; y++) {
                    var th = document.createElement("th");
                    if(document.getElementsByClassName("attr")[y].value == ""){
                        th.innerHTML = "attr";
                    }
                    else{
                        th.innerHTML = document.getElementsByClassName("attr")[y].value;
                    }
                    tr.appendChild(th);
                }
                nowTable.appendChild(tr);
            }
            document.getElementById("div2").appendChild(nowTable);
        }
    else if(index1 == 2){
        var trNew = document.createElement("tr");
        for(var n = 0; n < cols; n++){
            var tdNew = document.createElement("td");
            tdNew.setAttribute("class", "nowTD");
            tdNew.innerHTML = document.getElementsByClassName("attrInput")[n].value;
            trNew.appendChild(tdNew);
        }
        document.getElementById("nowTable").appendChild(trNew);
    }
    else if(index1 == 3 && isDelete == true){
        deleteRow(document.getElementById("nowTable"));
    }
    else if(index1 == 4){
        deleteTable(tables[document.getElementById("select2").selectedIndex]);
    }
}
function deleteMatchUp(){
    var deleteMatch = document.getElementsByClassName("deleteRow");
    var deleteOrigin = document.getElementsByClassName("nowTD");
    if(document.getElementById("div1").children.length != 1){
        for (var b = 0; b < document.getElementById("columnsNum").value; b++) {
            for(var d = 0; d < document.getElementsByClassName("nowTD").length; d++){
                if(deleteMatch[b].value == deleteOrigin[d].textContent){
                    deleteIndex[b] = d;
                }
            }
        }
        var deleteIndexMax = Math.max.apply(Math, deleteIndex);
        var deleteIndexMin = Math.min.apply(Math, deleteIndex);
        if(deleteIndexMax - deleteIndexMin + 1 == document.getElementById("columnsNum").value){
            isDelete = true;
        }
        else{
            isDelete = false;
        }
    }
}
function showAttrInput(){
    var attrInputDiv = document.getElementById("attrInputDiv");
    var attrName = document.getElementsByClassName("attr");
    if(document.getElementById("div1").children.length != 1){
        for (var a = 0; a < document.getElementById("columnsNum").value; a++) {
            var attrInput = document.createElement("input");
            attrInput.setAttribute("class", "attrInput");
            attrInput.setAttribute("type", "text");
            attrInput.setAttribute("placeHolder", attrName[a].value);
            attrInputDiv.appendChild(attrInput);
        }
        document.getElementById("div1").appendChild(attrInputDiv);
    }
    else{
    }
}
function deleteL(){
    var deleteInputDiv = document.getElementById("deleteInputDiv");
    var attrName = document.getElementsByClassName("attr");
    if(document.getElementById("div1").children.length != 1){
        for (var b = 0; b < document.getElementById("columnsNum").value; b++) {
            var deleteInput = document.createElement("input");
            deleteInput.setAttribute("class", "deleteRow");
            deleteInput.setAttribute("type", "text");
            deleteInput.setAttribute("placeHolder", attrName[b].value);
            deleteInputDiv.appendChild(deleteInput);
        }
        document.getElementById("div1").appendChild(deleteInputDiv);
        for (var c = 0; c < document.getElementById("columnsNum").value; c++) {
            document.getElementsByClassName("attrInput")[c].style.display = "none";
        }
        deleteInput.onchange = deleteMatchUp;
    }
    else{
    }
}
function deleteRow(nowTable){
    var rowIndex = (Math.max.apply(Math, deleteIndex) + 1) / document.getElementById("columnsNum").value;
    nowTable.deleteRow(rowIndex);
}
function deleteTable(nowTable){
    var select2 = document.getElementById("select2");
    nowTable.style.display = "none";
    var nowIndex2 = select2.selectedIndex;
    if(nowIndex2 != 0){
        select2.removeChild(select2.options[nowIndex2]);
    }
}