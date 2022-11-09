var frames = document.getElementsByTagName("frame");
for (var i = 0; i < frames.length; i++) {
    frames[i].addEventListener('load', onloadframe, true)
};
//console.log("Frame count");
//console.log(i);

function onloadframe(){
    console.log("onloadframe Frame loaded");
    this.contentWindow.addEventListener('mouseup',MacListenner,false);
    var framesinframe = this.contentWindow.document.getElementsByTagName("frame");
    for (var i = 0; i < framesinframe.length; i++) {
        console.log("add event listenner load frame in frame");
        framesinframe[i].addEventListener('load', onloadframe, true);
    };
    var iframesinframe = this.contentWindow.document.getElementsByTagName("iframe");
    for (var i = 0; i < iframesinframe.length; i++) {
        console.log("add event listenner load iframe in frame");
        if (iframesinframe[i].contentWindow.document.readyState == 'complete') {
            console.log("document in iFrame already loaded");
            iframesinframe[i].contentWindow.addEventListener('mouseup',MacListenner,false);
        }
        //iframesinframe[i].addEventListener("load", onloadiframe);
        iframesinframe[i].contentWindow.addEventListener('load',onloadframe,false);
    };
};

var iframes = document.getElementsByTagName("iframe");
for (var ifr = 0; ifr < iframes.length; ifr++) {
    iframes[ifr].addEventListener('load', onloadframe, true)
};
//console.log("IFrame count");
//console.log(ifr);

var frames = document.getElementsByTagName("frame");
for (var i = 0; i < frames.length; i++) {
    frames[i].addEventListener('load', onloadframe, true)
};
//console.log("Frame count:",i);

var iframes = document.getElementsByTagName("iframe");
for (var ifr = 0; ifr < iframes.length; ifr++) {
    iframes[ifr].addEventListener('load', onloadframe, true)
};
//console.log("IFrame count",ifr);

window.addEventListener('mouseup',MacListenner,false);
function MacListenner() {
    let mpan = this.document.getElementById("CiscoLiveMACATTRID");
    if (mpan != null){
        mpan.remove();
        //If div already exsixt then remove it and return
        return
    }

    let inputflag = false;

    if(this.document.activeElement.tagName.toUpperCase() == "INPUT"){
        ms = this.document.activeElement.value;
        //console.log("This element is Input and text is:",ms);
        inputflag = true;
    }else{
        ms = this.window.getSelection().toString();
        //console.log("This regular text, and text is:",ms);
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
            //console.log(ventext);

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
};