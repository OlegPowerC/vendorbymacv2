var frames = document.getElementsByTagName("frame");
for (var i = 0; i < frames.length; i++) {
    frames[i].addEventListener('load', onloadframe, true)
};

console.log(i);

function onloadframe(){
    this.contentWindow.addEventListener('mouseup',MacListenner,false);
    var framesinframe = this.contentWindow.document.getElementsByTagName("frame");
    for (var i = 0; i < framesinframe.length; i++) {
        console.log("add event listenner load frame in frame");
        framesinframe[i].addEventListener('load', onloadframe, true);
    };
};

window.addEventListener('mouseup',MacListenner,false);
function MacListenner() {
    let mpan = this.document.getElementById("CiscoLiveMACATTRID");
    if (mpan != null){
        mpan.remove();
    }

    let inputflag = false;

    if(this.document.activeElement.tagName.toUpperCase() == "INPUT"){
        ms = this.document.activeElement.value;
        inputflag = true;
    }else{
        ms = this.window.getSelection().toString();
    }

    if (ms != '') {

        let mactext = ms.match(/(([0-9,a-f,A-F]{2}[:,\-,\.]){5}[0-9,a-f,A-F]{2})|(([0-9,a-f,A-F]{4}[:,\-,\.]){2}[0-9,a-f,A-F]{4})/g);
        if(mactext != null){
            let bs = mactext[0].toLowerCase();
            bs = bs.replace(/[:,\..\-]/g,'')
            oui = bs.slice(0,6);
            let ventext = ""
            let ven = null
            oui = bs.slice(0,6);
            prefix = bs.slice(6,12);
            //console.log(oui);
            //console.log(prefix);
            chrange = parseInt(prefix, 16);
            //console.log(chrange);
            ven36p = VendorMap36[oui];
            if(ven36p != null){
                ven36p.forEach(element => {

                    if(chrange >= element[0] && chrange <= element[1]){
                        ven = element[2]
                        //console.log("InLoop",ven)
                    }
                });
            }

            //console.log(ven)
            if(ven != null){
                ventext = ven
            }else{
                ven = VendorMap[oui];
                //console.log(ven)
            }
            if(ven != null){
                ventext = ven
            }else{
                //console.log("Vendor not found")
                ventext = "Vendor not found"
            }
            console.log(ventext);

            let rect = this.document.activeElement.getBoundingClientRect();
            if(inputflag == false){
                rect = this.window.getSelection().getRangeAt(0).getBoundingClientRect();
            }

            var div = this.document.createElement('div');
            var belem = this.document.createElement('span');
            belem.setAttribute("style","font-size: 15px; color: blue; font-weight: bold; display: inline-block; white-space: nowrap;");
            belem.textContent  = ventext;

            div.style.border = '2px solid yellow';
            div.style.backgroundColor = 'yellow';
            div.style.position = 'fixed';
            div.onclick=function(){div.remove()};
            div.style.top = rect.bottom + 'px';
            div.style.left = rect.left + 'px';

            div.style.zIndex = "9999";

            div.appendChild(belem)
            div.setAttribute('id',"CiscoLiveMACATTRID")

            this.document.body.appendChild(div);
        }
    }
};let VendorMap36 = {
"986d35":[[1048576,2097151,`Shenzhen cositea electronics technology co.,LTD`],[8388608,9437183,`Beijing 3CAVI Tech Co.,Ltd`],[9437184,10485759,`Advanced Diagnostics LTD`],[4194304,5242879,`blossom communications corp.`],[7340032,8388607,`Zhejiang Hanshow Technology Co., Ltd.`],[6291456,7340031,`Vitronic Dr.-Ing. Stein Bildverarbeitungssysteme GmbH`],[13631488,14680063,`Praesideo B.V.`],[12582912,13631487,`my-PV GmbH`],[5242880,6291455,`PDAHL`],[3145728,4194303,`DH Mechatronic AG`],[0,1048575,`Shenzhen MALATA Mobile Communication Co.,LTD`],[2097152,3145727,`SHENZHEN FISE TECHNOLOGY HOLDING CO.,LTD.`],[11534336,12582911,`INTECH`],[14680064,15728639,`BAYCOM OPTO-ELECTRONICS TECHNOLGY CO., LTD.`],[10485760,11534335,`iWave Japan, Inc.`],],
let VendorMap = {
"5c7757":"Haivision Network Video",