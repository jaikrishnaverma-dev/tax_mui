const useQuery = () => {
    const getKeyValue=(dataHub:any,key:any)=>{
        let val=''
        dataHub&&dataHub.forEach((item:any, i:number) => {
                if ( item.name == key) {
                  val= item.value
                }
              });
            return val
    }
  return getKeyValue
}
export default useQuery