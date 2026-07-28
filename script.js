// =====================================
// 근무편성 조회
//
// 기준일 : 2026-07-06
//
// 7/6  병 / 갑 / 을
// 7/13 을 / 병 / 갑
// 7/20 갑 / 을 / 병
// 7/27 병 / 갑 / 을
//
// 주간은 7일마다 변경
// 야간/비번은 하루마다 교대
// =====================================


// ===============================
// 근무자 명단
// ===============================

const members = {

    "갑반":[

        "김광현(송현)",
        "강관묵(수성)",
        "설재우(반월당)",
        "최현석(동촌)"

    ],

    "을반":[

        "성종원(용산)",
        "김태영(동촌)",
        "박종민(황금)",
        "이동희(황금)"

    ],

    "병반":[

        "장민수(통제실)",
        "정운일(통제실)",
        "김창훈(반월당)",
        "서희상(3관제)",
        "채승우(용산)"

    ],

    "통상근무":[

        "김세훈(중정비)",
        "박성원(중정비)",
        "차승건(중정비)",
        "이종하(휴직)"

    ]

};



// ===============================
// 기준일
// ===============================

const baseDate = new Date(2026,6,6);



// ===============================
// 날짜 시간 제거
// ===============================

function clearTime(date){

    return new Date(

        date.getFullYear(),

        date.getMonth(),

        date.getDate()

    );

}



// ===============================
// 날짜 이동 버튼
// ===============================

function moveDate(days){

    const input = document.getElementById("date");

    let date = new Date(input.value);

    date.setDate(date.getDate()+days);

    const y = date.getFullYear();

    const m = String(date.getMonth()+1).padStart(2,"0");

    const d = String(date.getDate()).padStart(2,"0");

    input.value = `${y}-${m}-${d}`;

    searchWork();

}



// ===============================
// 버튼 날짜 표시
// ===============================

function updateMoveButtons(){

    const input = document.getElementById("date").value;

    if(!input) return;

    const date = new Date(input);

    const prev = new Date(date);

    prev.setDate(prev.getDate()-1);

    const next = new Date(date);

    next.setDate(next.getDate()+1);

    document.getElementById("prevBtn").innerHTML =
    `◀ 어제 (${prev.getDate()}일)`;

    document.getElementById("nextBtn").innerHTML =
    `내일 (${next.getDate()}일) ▶`;

}


// ===============================
// 조회
// ===============================

function searchWork(){

    const value =
    document.getElementById("date").value;

    if(!value){
        return;
    }

    updateMoveButtons();

    const target =
    clearTime(new Date(value));

    const diff =
    Math.floor(
        (target-baseDate)
        /
        (1000*60*60*24)
    );



    // ==========================
    // 주간 순환
    // 병 → 을 → 갑
    // ==========================

    const dayRotation = [

        "병반",
        "을반",
        "갑반"

    ];



    // ==========================
    // 야간 시작 순환
    // 갑 → 병 → 을
    // ==========================

    const nightRotation = [

        "갑반",
        "병반",
        "을반"

    ];



    const weekIndex =
    Math.floor(diff/7);



    const dayTeam =

    dayRotation[
        ((weekIndex%3)+3)%3
    ];



    const firstNight =

    nightRotation[
        ((weekIndex%3)+3)%3
    ];



    const firstOff =

    dayRotation.find(

        team=>

        team!==dayTeam &&

        team!==firstNight

    );



    let nightTeam;

    let offTeam;



    // 하루마다 교대

    if((diff%7)%2===0){

        nightTeam = firstNight;

        offTeam = firstOff;

    }

    else{

        nightTeam = firstOff;

        offTeam = firstNight;

    }



    let html="";



    html += makeBox(

        "통상근무",

        members["통상근무"]

    );



    html += makeBox(

        "주간 : "+dayTeam,

        members[dayTeam]

    );



    html += makeBox(

        "야간 : "+nightTeam,

        members[nightTeam]

    );



    html += makeBox(

        "비번 : "+offTeam,

        members[offTeam]

    );



    document.getElementById("result").innerHTML =

    html;

}

// ===============================
// 출력
// ===============================

function makeBox(title,list){

    let html = `

    <div class="box">

        <div class="title">

            ${title}

        </div>

    `;

    list.forEach(name=>{

        html += `

        <div class="member">

            ${name}

        </div>

        `;

    });

    html += `

    </div>

    `;

    return html;

}



// ===============================
// 최초 실행
// ===============================

window.onload = function(){

    const today = new Date();

    const y = today.getFullYear();

    const m = String(today.getMonth()+1).padStart(2,"0");

    const d = String(today.getDate()).padStart(2,"0");

    document.getElementById("date").value =
    `${y}-${m}-${d}`;

    searchWork();

};
