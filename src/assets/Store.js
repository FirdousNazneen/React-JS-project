import { configureStore, createSlice } from "@reduxjs/toolkit";

const productslice=createSlice({
    name:'products',
    initialState:{      
      veg:[{name:"POTATO",price:100 ,image:"potato.jpg"},
        {name:"TOMATO",price:200,image:"tomato.jpg"},
        {name:"BRINJAL",price:300,image:"brinjal.jpg"},
        {name:"CUCUMBER",price:1200,image:"cucumber.jpg"},
        {name:"SPINACH",price:150,image:"spinach.jpg"},
        {name:"CARROT",price:400,image:"carrot.jpg"},
        {name:"CHILLI",price:180,image:"chilli.jpg"},
        {name:"BEANS",price:250,image:"beans.jpg"},
        {name:"BEETROOT",price:180,image:"beetroot.jpg"},
        {name:"BITTER GOURD",price:250,image:"bitter gourd.jpg"},

     ],


     Nonveg:[{name:"CHICKEN",price:300,image:"chickenn.jpg"},
        {name:"MUTTON",price:500,image:"muttonn.jpg"},
        {name:"FISH",price:400,image:"fish.jpg"},
        {name:"PRAWNS",price:700,image:"prawns.jpg"},
        {name:"BEEF",price:800,image:"beef.jpg"},

    ],

    milk:[{name:"BUTTER",price:"500",image:"butter.jpg"},
        {name:"CHEESE",price:"600",image:"cheese.jpg"},
        {name:"YOGURT",price:"100",image:"yogurt.jpg"},
        {name:"GHEE",price:"600",image:"ghee.jpg"},
        {name:"CONDENSED MILK",price:"400",image:"condensed milk.jpg"},
        {name:"POWDERED MILK",price:"500",image:"powdered.jpg"}

    ]},

    reducers:{}
}

)

const cartSlice=createSlice(
    {
        name:'cart',
        initialState:[],
        reducers:{
            addToCart:(state,action)=>{
                 const item=state.find(item=>item.name===action.payload.name);
                 if(item){
                    item.quantity+=1;
                 }
                  else{
                    state.push({...action.payload,quantity:1});
                  }  
            },

            increment:(state,action)=>{
                  const item=state.find(item=>item.name===action.payload.name)
                  if(item){
                   item.quantity+=1
                  }
            },

           decrement:(state,action)=>{
                 const item=state.find(item=>item.name===action.payload.name)
                 if(item&&item.quantity>0){
                     item.quantity-=1
                 }
                 else{
                    return state.filter(item=>item.name!==action.payload.name); 
                 }
         },

               remove:(state,action)=>{

                return state.filter(item=>item.name!==action.payload.name);
               },
            
               clearcart:()=>[ ]
               

    }
}
)

const purchasedetailsslice=createSlice({
    name:"purchase",
    initialState:[],
    reducers:{
        purchaseitem:(state,action)=>{
            state.push(action.payload);
        }
    }
    
}
 )

 const Authslice=createSlice(
    {
        name:"auth",
        initialState:{
            isAuthenticated: localStorage.getItem("username")?true:false,
            user:localStorage.getItem("username") || ' ',
        },

        reducers:{
            login: (state,action)=>
            {
                state.isAuthenticated=true;
                state.user=action.payload;

                localStorage.setItem("username",action.payload);
            },

            logout:(state)=>{
                state.isAuthenticated=false;
                state.user=" ";
                localStorage.removeItem( "username");
                }


            }
        }

    
 )

const store=configureStore(
    {
        reducer:{
            products:productslice.reducer,
                cart:cartSlice.reducer,
                 purchase:purchasedetailsslice.reducer,
                 auth:Authslice.reducer
            }
        }
    
)
export default store
export const{addToCart,increment,decrement,remove,clearcart}=cartSlice.actions; 
export const {purchaseitem}=purchasedetailsslice.actions;
export const{login,logout}=Authslice.actions;