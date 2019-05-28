import React from "react";
import "./edit.css";



function edit() {
    
  return (
    <form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Nombre Receta</label>
      <input  className="form-control" id="inputEmail4" placeholder="Nombre"/>
    </div>
    <label>Ingredientes</label>
    <div className="form-group col-md-6">
    
    <div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
  <label className="form-check-label" for="inlineCheckbox1">Pollo</label>
</div>
<div className="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
  <label className="form-check-label" for="inlineCheckbox2">Carne</label>
</div>
    </div>
  </div>
  <div className="form-group col-md-12">
    <label for="exampleFormControlTextarea1">Forma de Preparar</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" for="gridCheck">
        Sin Gluten
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" for="gridCheck">
        Vegana
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" for="gridCheck">
        Vegetariana
      </label>
    </div>
  </div>
  <div class="form-group">
    <label for="exampleFormControlFile1">Example file input</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

  );
}

export default edit;