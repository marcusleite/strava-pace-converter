/*
  This function takes a string parameter similar to
  "7:52/km" in minutes/km and returns it in km/h
*/
function pace_to_kmh(pace){
    let minutes, seconds, hours;
    [minutes, seconds] = pace.split("/")[0].split(":");
    hours = (parseInt((minutes * 60)) + parseInt(seconds))/3600;
    return(Number.parseFloat(1/hours).toFixed(2));
}

/*
    This function checks if the user is logged in by looking for the login button
*/
function is_logged_in(){
    if(document.querySelector(".logged_out_nav") === null){
        return(true);
    }else{
        return(false);
    }    
}

function change_logged_in_1(){
    let elem = document.querySelector(".inline-stats :nth-child(3) strong");
    const raw_pace = elem['innerText'];
    elem['innerText'] = pace_to_kmh(raw_pace);    
}

if(is_logged_in()){
    // Change 1: the "pace" value near the time spent
    let elem = document.querySelector(".inline-stats :nth-child(3) strong");
    let raw_pace = elem['innerText'];
    elem['innerText'] = pace_to_kmh(raw_pace)  +" km/h";

    // Change 2: the "pace" value near the "this run" prompt
    elem = document.querySelector("div.mb-xs.mt-sm.pace");
    let prefix = elem['innerText'].split(' ').slice(0,-1).join(' ');
    raw_pace = elem['innerText'].split(' ').pop();
    elem['innerText'] = prefix + ' ' + pace_to_kmh(raw_pace)  +" km/h";

    // Change 3
    elem = document.querySelectorAll("#contents tr");
    let strArr, tmp1, tmp2;
    elem.forEach(
        (tr) => {
            strArr = tr['innerText'].split("\n");
            tmp1 = pace_to_kmh(strArr[1].trim());
            tmp2 = pace_to_kmh(strArr[2].trim());
            tr['innerHTML'] =             
                `<td class=\"centered\">${ strArr[0] }</td>
                <td>${ tmp1 } <abbr class=\"unit short\" title=\"kilometers per hour\">km/h</abbr></td>
                <td>${ tmp2 } <abbr class=\"unit short\" title=\"kilometers per hour\">km/h</abbr></td>
                <td>${ strArr[3]} <abbr class=\"unit short\" title=\"meters\">m</abbr></td>`
            ;
        }
    );
}

console.log('aaa');
// this line is just to check if the "matches" on my manifest are ok
//document.body.style.border = "10px solid red";
