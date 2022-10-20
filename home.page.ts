import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import{map} from 'rxjs/operators';
import { Product } from '../model/products';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //bech naaml creation nta3 proprieté allproducts 

  allproducts:Product[]=[];
  @ViewChild('productsForm') form:NgForm;
  editMode:boolean=false;

currentProductId:string;


  constructor(public http:HttpClient) {
    this.fetchProducts();
  }




ngOnInit(): void {
}



onProductsFetch(){
  this.fetchProducts();//hadhi methode 3ayetna fastha lel methode fetchProduct
}




fetchProducts(){
 

this.http.get<{[key:string]:Product}>('https://fire-550d6-default-rtdb.firebaseio.com/products.json').pipe(map((res)=>{
  //methode pipe :transform data 
  //map hya proprety
  // 3malthom fi chakel array el array fih des objets 

  // w ki nkteb haka <> baad el methode adhaka raw type de reponse nta3 el methode adhika 
  const products=[];//ensemble de produits 
  for(const key in res){

    if(res.hasOwnProperty(key)){

products.push({...res[key],id:key})

    }
  }
return products;
}))


.subscribe((products)=>{

console.log(products);

this.allproducts=products;
});

}






  onProductCreate( products:{pName : string  ,description : string,price:string})
  {
//methode hatina fiha argument   fih el variable nte3o lkol 
if(!this.editMode){ //kenou false bech ykhdem khedmt el ADD


console.log(products); //lhna bech y'affichili fel console les products eli zedthom 

this.http.post<{name:string}>('https://fire-550d6-default-rtdb.firebaseio.com/products.json',products).subscribe((res)=>{

//lhna zedt /products bech yasnaali howa file thet el data base nte3i eli bech yji tehtou les produits eli zedthom 
//najem nsamih ay esm .

//w ken maamltch .subscribe mathama hata requete bech tetaada lel data base nte3i aala khater de nature el methode post 
// traja3li observable lazemni nhotlha .subscribe bech tetaada requete 


console.log(res);

});
}
else
{//kenou true bech ykhdem khdemt el EDIT
this.updateProduct(this.currentProductId,products);

}



  }


updateProduct(id:string,value:Product){

this.http.put('https://fire-550d6-default-rtdb.firebaseio.com/products/'+id+'.json',value).subscribe();

}


onEditClicked(id:string){
//get the product based on the id 


this.currentProductId=id;
let currentProduct=this.allproducts.find((p)=>{ return p.id===id});
//console.log(this.form);


// populate the form with the products détails 

this.form.setValue({
//bech ki nros aala edit yatl3ouli el contenu nta3 el produit adhaka w njam nbadel fih 

pName:currentProduct.pName,
description:currentProduct.description,
price:currentProduct.price


})


//chagne button value to update product 

this.editMode=true;// el variable boolean edit mode bech ybadeli esm el button ki nros aala edit 
//men ken Add product ywali editProduct 
}






onDeleteProduct(id:string){

this.http.delete('https://fire-550d6-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe();

}



onDeleteALLProduct(){

  this.http.delete('https://fire-550d6-default-rtdb.firebaseio.com/products.json').subscribe();
  
  }
  


  }



  



