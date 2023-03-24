import { useEffect, useRef } from "react"

export const Canvas = (props: any) => {
  const canvasRef = useRef(null)

  useEffect(() => {
      const image = new Image()
      image.src = props.url

      const scale = props.scale
      
      const canvas: any = canvasRef.current
      const context = canvas.getContext('2d')
      context.fillStyle = "rgba(159, 159, 159, 0.1)"
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)
     
      image.onload = () => {
        context.drawImage(
          image, 
          canvas.width / 2 - image.width / scale/2,
          canvas.height / 2 - image.height / scale/2,
          image.width / scale,
          image.height / scale
        )
      }
  }, [])

  return <canvas ref={canvasRef} {...props} width={props.width} height={props.height} />
}
