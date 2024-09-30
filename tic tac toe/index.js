let turn = true
let btnClicked = 0
let btns = document.querySelectorAll(".btn")
btns.forEach(b=>{
    b.addEventListener("click" , btnClick)
})

function btnClick() {
    if (this.textContent !=""){
      
     
  swal(  "! משבצת מלאה", " נסה שוב במקום אחר", "שגיאה");
       
      
     return}
     btnClicked ++
     if(turn) this.textContent = "X" 
     else this.textContent = "0"

     let obj = chickWin()
     if(obj.win){
        let btns = document.querySelectorAll(".btn")
        btns [obj.pos[0]] .style .color = "red" 
        btns [obj.pos[1]] .style .color = "red" 
        btns [obj.pos[2]] .style .color = "red"


       

        setTimeout(() =>{
            swal("!!ניצח    "+ this.textContent  ,"  לחץ על הכפתור 'המשך' כדי להמשיך למשחק חדש", {
                button: "המשך"
              });
              
              //"    ' ניצח!! למשחק חדש לחץ 'אישור" + this.textContent)
        reset()
    } , 100 ) 

    }else if (obj.isTie){
    setTimeout(() =>{
        alert ( " is A Tia")
        reset()
    } , 100 ) 
}
    turn = !turn
}

function reset() {
     let btns = document.querySelectorAll(".btn")
     true == !true
     btnClicked = 0
     btns.forEach(b =>{
     b.textContent = ""
     b.style.color = ""
    })
} 

function chickWin() {
    let btns = document.querySelectorAll (".btn")
    let obj = {win:false , isTie:false , pos:[]}

    if(btns[0].textContent == btns[1].textContent && btns[1].textContent == btns[2].textContent && btns[2].textContent  != "")
    obj = {win:true , isTie:false , pos:[0 , 1 , 2]}
    else if(btns[3].textContent == btns[4].textContent && btns[4].textContent == btns[5].textContent && btns[5].textContent  != "")
    obj =  {win:true , isTie:false , pos:[3 , 4 , 5]}
    else if(btns[6].textContent == btns[7].textContent && btns[7].textContent == btns[8].textContent && btns[8].textContent  != "")
    obj =  {win:true , isTie:false , pos:[6 , 7 , 8]}
    else if(btns[0].textContent == btns[3].textContent && btns[3].textContent == btns[6].textContent && btns[6].textContent  != "")
    obj =  {win:true , isTie:false , pos:[0 , 3 , 6]}
    else if(btns[1].textContent == btns[4].textContent && btns[4].textContent == btns[7].textContent && btns[7].textContent  != "")
     obj = {win:true , isTie:false , pos:[1 , 4 , 7]}
    else if(btns[2].textContent == btns[5].textContent && btns[5].textContent == btns[8].textContent && btns[8].textContent  != "")
    obj =  {win:true , isTie:false , pos:[2, 5 , 8]} 
    else if(btns[0].textContent == btns[4].textContent && btns[4].textContent == btns[8].textContent && btns[8].textContent  != "")
    obj =  {win:true , isTie:false , pos:[0 , 4 , 8]} 
    else if(btns[2].textContent == btns[4].textContent && btns[4].textContent == btns[6].textContent && btns[6].textContent  != "")
    obj =  {win:true , isTie:false , pos:[2 , 4 , 6]}
    else if(btnClicked == 9)
    obj.isTie = true
   // obj =  {win:false , isTie:false , pos:[]}

    return obj

}

// function computerTurn(board) {
//     // חפש שלוש נקודות עוקבות באותו צבע
//     for (let i = 0; i < board.length; i++) {
//       if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== "") {
//         return i;
//       } else if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== "") {
//         return i;
//       } else if (board[i][0] === board[1][1] && board[i][0] === board[2][2] && board[i][0] !== "") {
//         return i;
//       } else if (board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] !== "") {
//         return i;
//       }
//     }
  
//     // חפש שתי נקודות עוקבות באותו צבע, עם נקודה שלישית פנויה
//     for (let i = 0; i < board.length; i++) {
//       for (let j = 0; j < board[i].length; j++) {
//         if (board[i][j] !== "" && board[i][j] === board[i][(j + 1) % 3]) {
//           if (board[i][(j + 2) % 3] === "") {
//             return i * 3 + (j + 2) % 3;
//           }
//         } else if (board[i][j] !== "" && board[i][j] === board[(i + 1) % 3][j]) {
//           if (board[(i + 2) % 3][j] === "") {
//             return (i + 2) % 3 * 3 + j;
//           }
//         } else if (board[i][j] !== "" && board[i][j] === board[i][(i + 1) % 3][(j + 1) % 3]) {
//           if (board[i][(i + 2) % 3][(j + 2) % 3] === "") {
//             return (i + 2) % 3 * 3 + (j + 2) % 3;
//           }
//         } else if (board[i][j] !== "" && board[i][j] === board[(i - 1) % 3][(j - 1) % 3]) {
//           if (board[(i + 1) % 3][(j + 1) % 3] === "") {
//             return (i + 1) % 3 * 3 + (j + 1) % 3;
//           }
//         }
//       }
//     }
  
//     // בחר נקודה אקראית
//     let randomIndex = Math.floor(Math.random() * board.length);
//     return randomIndex * 3 + Math.floor(Math.random() * 3);
//   } 