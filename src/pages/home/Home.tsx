import { useEffect } from "react"
import Card from "../../globals/components/card/Card"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import Hero from "./component/Hero"
import { fetchProduct } from "../../store/productSlice"



const Home = () => {
  const dispatch =useAppDispatch()
  const {product}=useAppSelector((state)=>state.product)
  useEffect(()=>{
    dispatch(fetchProduct())
  },[])

  return (
    <>
    <Hero/>
    <div className="flex flex-col items-center">
    <h1 className="text-4xl font-bold  text-center mb-6 text-gray-800">Top Products</h1>
    <div className="flex flex-wrap justify-center gap-6">
      
      {
        product.length > 0 && product.map((pd)=>{
          return (
            <Card key={pd.id} data={pd}/>
          )
        })
      }

    </div>
    </div>
  </>
  )
}

export default Home