let indexMeca = 0;
let indexAngel = 0;
let defaultPiloteName;
let defaultCardName;

//-----------------------------------------------------FullscreenAPI-----------------------------------------------------------------------------------------------------------
function enableFullscreen()
{
    document.documentElement.requestFullscreen()
}


//-----------------------------------------------------BatteryAPI--------------------------------------------------------------------------------------------------------------------
function onChargingChange() {
    handleChange('Battery charging changed to ' + (this.charging ? 'charging' : 'discharging') + '')
  }
  function onChargingTimeChange() {
    handleChange('Battery charging time changed to ' + this.chargingTime + ' s');
  }
  function onDischargingTimeChange() {
    handleChange('Battery discharging time changed to ' + this.dischargingTime + ' s');
  }
  function onLevelChange() {
    handleChange('Battery level changed to ' + this.level + '');
  }

  var batteryPromise;
  
  if ('getBattery' in navigator) {
    batteryPromise = navigator.getBattery();
  } else {
    batteryPromise = Promise.resolve(navigator.battery);
  }
  
  batteryPromise.then(function (battery) {
    document.getElementById('charging').innerHTML = battery.charging ? 'charging' : 'discharging';
    document.getElementById('chargingTime').innerHTML = battery.chargingTime + ' s';
    document.getElementById('dischargingTime').innerHTML = battery.dischargingTime + ' s';
    document.getElementById('level').innerHTML = battery.level;
    
    battery.addEventListener('chargingchange', onChargingChange);
    battery.addEventListener('chargingtimechange', onChargingTimeChange);
    battery.addEventListener('dischargingtimechange', onDischargingTimeChange);
    battery.addEventListener('levelchange', onLevelChange);
  });



//----------------------------------------------------function for adding cards----------------------------------------------------------------------------------
function addCard(Side, storageIndex, storageTypeOfCard, storageCardName, storagePiloteName)
{
    let value;
    let masterId;
    if(storageTypeOfCard == null)
    {
        if(Side == "EVA")
        {
            masterId = "EVA";
            const select = document.getElementById("dropDownEVA");
            value = select.options[select.selectedIndex].value;
        }
        else if(Side == "Angel")
        {
            masterId = "Angel";
            const select = document.getElementById("dropDownAngel");
            value = select.options[select.selectedIndex].value;
        }
    }
    else
    {
        value = storageTypeOfCard;
        masterId = Side;
        if(Side == "EVA")
        {
            indexMeca = storageIndex;
        }
        else if(Side == "Angel")
        {
            indexAngel = storageIndex;
        }
    }

    console.log(masterId);
    const block = document.getElementById(masterId);
    const divCard = document.createElement("div");
    divCard.setAttribute("id", "divCard"+indexMeca);
    divCard.setAttribute("class", "Card");
    divCard.style.margin = "20px 50px 0 50px";
    block.appendChild(divCard);

    
    // Nom de la carte
    let titreEVA = document.createElement("h2");
    titreEVA.setAttribute("class", "nomCard");
    if(Side == "EVA")
    {
        titreEVA.setAttribute("id", "cardName" + "-" + Side + "-" + indexMeca);
        if(storageCardName == null)
        {
            if(indexMeca < 10)
            {
                defaultCardName = "EVA_0" + indexMeca;
                titreEVA.textContent = defaultCardName;
            }
            else
            {
                defaultCardName = "EVA_" + indexMeca;
                titreEVA.textContent = defaultCardName;
            }
        }
        else
        {
            titreEVA.textContent = storageCardName;
        }
    }
    else if(Side == "Angel")
    {

        titreEVA.setAttribute("id", "cardName" + "-" + Side + "-" + indexAngel);
        if(storageCardName == null)
        {
            defaultCardName = "Angel-" + indexAngel;
            titreEVA.textContent = defaultCardName;
        }
        else
        {
            titreEVA.textContent = storageCardName;
        }
    }
    titreEVA.style.textAlign = "center";
    divCard.appendChild(titreEVA);

    let inputCardName = document.createElement("input");
    inputCardName.setAttribute("class", "inputCardName");
    if(Side == "EVA")
    {
        inputCardName.setAttribute("id", "inputCardName" + "-" + Side + "-" + indexMeca);
    }
    else if(Side == "Angel")
    {
        inputCardName.setAttribute("id", "inputCardName" + "-" + Side + "-" + indexAngel);
    }
    divCard.appendChild(inputCardName);
    inputCardName.style.display = "none";
        

        //-----------------------------------------------Image de la carte------------------------------------------------------------------------------------------------------------------------
    const img = document.createElement("img");
    if(value == "EVA_01")
    {
        defaultPiloteName = "Shinji";
        img.setAttribute("src", "sources/images/EVA_01.jpg");
    }
    else if(value == "EVA_02")
    {
        defaultPiloteName = "Asuka";
        img.setAttribute("src", "sources/images/EVA_02.png");
    }
    else if(value == "EVA_00")
    {
        defaultPiloteName = "Rei";
        img.setAttribute("src", "sources/images/EVA_00.png");
    }
    else if(value == "Leliel")
    {
        img.setAttribute("src", "sources/images/Leliel.png");
    }
    else if(value == "Bardiel")
    {
        img.setAttribute("src", "sources/images/Bardiel.png");
    }
    else if(value == "Ramiel")
    {
        img.setAttribute("src", "sources/images/Ramiel.png");
    }
    else if(value == "FourthAngel")
    {
        img.setAttribute("src", "sources/images/FourthAngel.png");
    }
    else if(value == "Zeruel")
    {
        img.setAttribute("src", "sources/images/Zeruel.png");
    }
    if(Side == "EVA")
    {
        img.setAttribute("id", "EVA_" + indexMeca);
    }
    else if(Side == "Angel")
    {
        img.setAttribute("id", "Angel_" + indexAngel);
    }
    img.setAttribute("class", "image");
    divCard.appendChild(img);
    
            //---------------------------------------Nom des Pilotes pour les EVA et input pour le modifier---------------------------------------------------------------------------------------------
    if(Side == "EVA")
    {
        const divPilote = document.createElement("div");
        divPilote.setAttribute("class", "divPilote");
        divCard.appendChild(divPilote);

        const piloteLabel = document.createElement("p");
        piloteLabel.setAttribute("class", "piloteLabel");
        piloteLabel.setAttribute("id", "labelPiloteEVA" + indexMeca);
        piloteLabel.textContent = "Pilote :" ;
        divPilote.appendChild(piloteLabel);

        let piloteName = document.createElement("p");
        piloteName.setAttribute("class", "piloteName");
        piloteName.setAttribute("id", "nomPiloteEVA" + indexMeca);
        if(storagePiloteName == null)
        {
            piloteName.textContent = defaultPiloteName;
        }
        else
        {
            piloteName.textContent = storagePiloteName;
        }
        divPilote.appendChild(piloteName);

        let inputName = document.createElement("input");
        inputName.setAttribute("class", "inputPiloteName");
        inputName.setAttribute("id", "inputNomPiloteEVA" + indexMeca);
        divPilote.appendChild(inputName);
        inputName.style.display = "none";
    }
    
            //------------------------------------------Parent des Bouttons------------------------------------------------------------------------------------------------------------------
    const divParametres = document.createElement("div");
    divParametres.setAttribute("class", "cardParameters");
    divCard.appendChild(divParametres);

            // Boutton effacer
    let btnErase = document.createElement("button");
    btnErase.setAttribute("type", "button");
    if(Side == "EVA")
    {
        btnErase.setAttribute("id", "btnErase" + "-" + Side + "-" + indexMeca);
    }
    else if(Side == "Angel")
    {
        btnErase.setAttribute("id", "btnErase" + "-" + Side + "-" + indexAngel);
    }
    btnErase.textContent = "X";
    btnErase.setAttribute("class","btnErase");
    btnErase.addEventListener("click", pressEraseButton);
    divParametres.appendChild(btnErase);
    
            //-------------------------------------------Boutton Editer--------------------------------------------------------------------------------------------------------------
    let btnEdit = document.createElement("button");
    btnEdit.setAttribute("type", "button");
    if(Side == "EVA")
    {
        btnEdit.setAttribute("id", "btnEdit" + "-" + Side + "-" + indexMeca + "-" + value);
    }
    else if(Side == "Angel")
    {
        btnEdit.setAttribute("id", "btnEdit" + "-" + Side + "-" + indexAngel + "-" + value);
    }
    btnEdit.textContent = "Edit";
    btnEdit.setAttribute("class","btnEdit");
    btnEdit.addEventListener("click", pressEditButton);
    divParametres.appendChild(btnEdit);

            //-------------------------------------------Boutton Valider--------------------------------------------------------------------------------------------------------------

    let btnValidate = document.createElement("button");
    btnValidate.setAttribute("type", "button");
    if(Side == "EVA")
    {
        btnValidate.setAttribute("id", "btnValidate" + "-" + Side + "-" + indexMeca + "-" + value);
    }
    else if(Side == "Angel")
    {
        btnValidate.setAttribute("id", "btnValidate" + "-" + Side + "-" + indexAngel + "-" + value);
    }
    btnValidate.textContent = "Ok";
    btnValidate.setAttribute("class","btnValidate");
    btnValidate.addEventListener("click", pressValidateButton);
    divParametres.appendChild(btnValidate);
    btnValidate.style.display = "none";

    if(storageCardName == null)
    {
        if(Side == "EVA")
        {
            pushToLocal(Side, value, indexMeca, defaultCardName, defaultPiloteName);
        }
        else if(Side == "Angel")
        {
            pushToLocal(Side, value, indexAngel, value, defaultCardName);
        }
    }

    if(Side == "EVA")
    {
        indexMeca++;
    }
    else if(Side == "Angel")
    {
        indexAngel++;
    }
}

//----------------------------------Suppression d'une carte------------------------------------------------------------------------------------------------------------------
    function pressEraseButton(e)
    {
        eraseMecaCard(e.target.id)
    }

    function eraseMecaCard(itemId)
    {
        let element = document.getElementById(itemId);
        let parts = itemId.split("-");
        let sideCard = parts[1];
        let numCard = parts[2];
        deleteInLocal(sideCard, numCard);
        element.parentNode.parentNode.remove(element);
    }


//---------------------------------------------------Edition d'une carte--------------------------------------------------------------------------------------------------
    function pressEditButton(e) 
    {
        editMecaCard(e.target.id)
    }

    function editMecaCard(itemId)
    {

        let element = itemId;
        let parts = element.split("-");
        let sideCard = parts[1];
        let numCard = parts[2];
        let typeOfCard = parts[3];

        let validBTN = document.getElementById("btnValidate" + "-" + sideCard + "-" + numCard + "-" + typeOfCard);
        validBTN.style.display = "block";
        let editBTN = document.getElementById("btnEdit" + "-" + sideCard + "-" + numCard + "-" + typeOfCard);
        editBTN.style.display = "none";

        if(sideCard == "EVA")
        {
            let inputPilote = document.getElementById("inputNomPiloteEVA" + numCard);
            inputPilote.style.display = "block";
            let namePilote = document.getElementById("nomPiloteEVA" + numCard);
            namePilote.style.display = "none";
        }

        let inputCard = document.getElementById("inputCardName" + "-" + sideCard + "-" + numCard);
        inputCard.style.display = "block";
        let nameCard = document.getElementById("cardName" + "-" + sideCard + "-" + numCard);
        nameCard.style.display = "none";
    }

//--------------------------------------------Validation modification d'une carte------------------------------------------------------------------------------------

function pressValidateButton(e) 
{
    validateModify(e.target.id)
}

function validateModify(itemId)
{
    let element = itemId;
    let parts = element.split("-");
    let sideCard = parts[1];
    let numCard = parts[2];
    let typeOfCard = parts[3];
    let validBTN = document.getElementById("btnValidate" + "-" + sideCard + "-" + numCard + "-" + typeOfCard);
    validBTN.style.display = "none";
    let editBTN = document.getElementById("btnEdit" + "-" + sideCard + "-" + numCard + "-" + typeOfCard);
    editBTN.style.display = "block";
    let inputCard = document.getElementById("inputCardName" + "-" + sideCard + "-" + numCard);
    let nameCard = document.getElementById("cardName" + "-" + sideCard + "-" + numCard);
    let namePilote = document.getElementById("nomPiloteEVA" + numCard);
    if(inputCard.value.length != 0)
    {
        if(sideCard == "EVA")
        {
            nameCard.textContent = inputCard.value.toUpperCase();
        }
        else if(sideCard == "Angel")
        {
            nameCard.textContent = inputCard.value;
        }
    }
    if(sideCard == "EVA")
    {
        let inputPilote = document.getElementById("inputNomPiloteEVA" + numCard);
        namePilote = document.getElementById("nomPiloteEVA" + numCard);
        if(inputPilote.value.length != 0)
        {
            namePilote.textContent = inputPilote.value;
        }
        inputPilote.style.display = "none";
        namePilote.style.display = "block";
    }
    else
    {
        namePilote = "";
    }
    pushToLocal(sideCard, typeofCard, numCard, nameCard.textContent, namePilote.textContent);
    inputCard.style.display = "none";
    nameCard.style.display = "block";
}

//-----------------------------------------LocalStorage functions-----------------------------------------------------------------------------------------------------------------

function onLoadFunctions()
{
    for (let i = 0; i < localStorage.length; i++)
    {
        let data = localStorage.getItem(localStorage.key(i));
        data = data.replace(']','');
        data = data.replace('[','');
        for (let y = 0; y < data.length; y++)
        {
            data = data.replace('"','');
        }
        let parts = data.split(",");
        addCard(parts[0], parts[2], parts[1], parts[3], parts[4]);
    }
}

function pushToLocal(sideCard, typeofCard, index, cardName, piloteName)
{
    let data = [sideCard, typeofCard, index, cardName, piloteName];
    localStorage.setItem("card" + "-"+ sideCard+ "-"+ index, JSON.stringify(data));
}

function deleteInLocal(sideCard, index)
{
    localStorage.removeItem("card" + "-"+ sideCard+ "-"+ index);
}