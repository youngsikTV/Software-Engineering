let recognition;

if ('webkitSpeechRecognition' in window){

recognition = new webkitSpeechRecognition();
recognition.lang="ko-KR";
recognition.continuous=true;

recognition.onresult=function(event){

let box=document.getElementById("meetingText");

for(let i=event.resultIndex;i<event.results.length;i++){
box.value += event.results[i][0].transcript + " ";
}

};

}

function startRecording(){
if(recognition) recognition.start();
}

function stopRecording(){
if(recognition) recognition.stop();
}

function makeSummary(){

let text=document.getElementById("meetingText").value;

let sentences=text.split(/[.!?]\s/);

let summary=sentences.slice(0,3);

let result="<h3>📌 핵심 요약</h3><ul>";

summary.forEach(s=>{
result+="<li>"+s+"</li>";
});

result+="</ul>";

document.getElementById("summaryResult").innerHTML=result;

}

function makeTodo(){

let text=document.getElementById("meetingText").value;

let tasks=[];

if(text.includes("수정")) tasks.push("UI 수정 작업 진행");
if(text.includes("마케팅")) tasks.push("마케팅 전략 준비");
if(text.includes("일정")) tasks.push("프로젝트 일정 재조정");
if(text.includes("개발")) tasks.push("개발 일정 점검");

if(tasks.length===0){
tasks.push("회의 내용 검토 후 작업 정리");
}

let result="<h3>✅ 할 일 목록</h3><ul>";

tasks.forEach(t=>{
result+="<li>"+t+"</li>";
});

result+="</ul>";

document.getElementById("todoResult").innerHTML=result;

}