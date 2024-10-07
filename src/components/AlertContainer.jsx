

export default function AlertContainer({message,type}) {
  let css="alert ";
  if(type){
    css+=type
  }
  return (
    <div className={css} role="alert">
    {message}
  </div>
  )
}
