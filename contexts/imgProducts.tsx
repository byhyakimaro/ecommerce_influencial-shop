import { useEffect, useRef } from "react"

export const Canvas = (props: any) => {
  const canvasRef = useRef(null)

  useEffect(() => {
      const image = new Image()
      image.src = props.url
      
      const canvas: any = canvasRef.current
      const context = canvas.getContext('2d')
      context.fillStyle = "#ffffff"
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
     
      image.onload = () => {
        context.drawImage(
          image, 
          canvas.width / 2 - image.width / 2.5,
          canvas.height / 2 - image.height / 2.5,
          image.width / 1.2,
          image.height / 1.2
        )
      }
  }, [])

  return <canvas ref={canvasRef} {...props} width={520} height={420} />
}
