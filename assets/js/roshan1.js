const selectApproach = document.getElementById("approach");
    const refElement = document.getElementById("selectRef");
    const  batchElement  = document.getElementById("selectBatch");
  
    selectApproach.addEventListener("change", function(){
      if(selectApproach.value === "ref"){
          refElement.style.display = "block";
          batchElement.style.display = "block";
      }else {
          refElement.style.display = "none";
          batchElement.style.display = "none";
      }
    });