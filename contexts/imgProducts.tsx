import { useEffect, useRef } from "react"

export const Canvas = (props: any) => {
  const canvasRef = useRef(null)

  useEffect(() => {
      const image = new Image()
      image.src = props.url
      
      const canvas: any = canvasRef.current
      const context = canvas.getContext('2d')
      context.fillStyle = "#000000"
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
     
      image.onload = () => {
          context.drawImage(image, 0, 0)
      }
  }, [])

  return <canvas ref={canvasRef} {...props} width={288} height={480} />
}
