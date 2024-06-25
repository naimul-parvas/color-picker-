const pickColorBtn =document.getElementById("color-picker")
const pickColorDiv =document.getElementById("picked-colors")
const colorList = document.querySelector(".all-colors")
const clearBtn = document.querySelector(".clear-all")
//  const pickcolor = [];

// const pickcolor = JSON.parse(localStorage.getItem("pickedcolor") || "[]") ; 
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

// step 1 



const actieEyeDropper = async () =>{


    

    const eyedroper = new EyeDropper();
    const {sRGBHex} = await eyedroper.open();
    navigator.clipboard.writeText(sRGBHex);
    pickedColors.push(sRGBHex);
    //  pickcolor.push(sRGBHex);
    // localStorage.setItem("pickedcolor", JSON.stringify(pickcolor));
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));


    showColor()
   
   
};

pickColorBtn.addEventListener("click",actieEyeDropper );


// step two

const showColor = () => {
 
    colorList.innerHTML =pickedColors
      .map(
        (color) => `
          <li class="color">
              <span class="rect" style="background: ${color};"></span>
              <span class="value hex" data-color="${color}">${color}</span>
          </li>
      `
      )
      .join("");
      
    // Generating li for the picked color and adding it to the colorList
  
    let colors =  document.querySelectorAll(".color")
    console.log(colors)
   colors.forEach((li) => {
    li.addEventListener("click", (e) =>{
      let red = e.target.innerText;
      navigator.clipboard.writeText(e.target.innerText);
      e.target.innerText = "copied"
      setTimeout(() => (e.target.innerText=red ), 700);
      
    });
   });
  };



 const clear = () =>{
     pickedColors.length = 0
     localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
 }

 clearBtn.addEventListener("click", clear );

clearBtn.addEventListener("click", ()=>{
    colorList.innerHTML = "";
    
});


// step three 

showColor();