import { onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

export function useThreeSvg(containerRef) {
  let scene, camera, renderer, svgGroup
  
  const init = () => {
    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 1, 1000)
    camera.position.z = 100
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.value.appendChild(renderer.domElement)
    
    animate()
  }
  
  const loadSvg = async (url) => {
    const loader = new SVGLoader()
    const data = await loader.loadAsync(url)
    
    svgGroup = new THREE.Group()
    
    data.paths.forEach(path => {
      const shapes = SVGLoader.createShapes(path)
      shapes.forEach(shape => {
        const geometry = new THREE.ShapeGeometry(shape)
        const material = new THREE.MeshBasicMaterial({ 
          color: path.color,
          side: THREE.DoubleSide 
        })
        svgGroup.add(new THREE.Mesh(geometry, material))
      })
    })
    
    scene.add(svgGroup)
    resizeSvg()
  }
  
  const resizeSvg = () => {
    if (!svgGroup) return
    
    // SVG 크기에 맞게 조정
    const box = new THREE.Box3().setFromObject(svgGroup)
    const size = box.getSize(new THREE.Vector3())
    const scale = Math.min(window.innerWidth/size.x, window.innerHeight/size.y) * 0.8
    svgGroup.scale.set(scale, scale, scale)
  }
  
  const onResize = () => {
    if (!camera || !renderer) return
    
    camera.left = -window.innerWidth / 2
    camera.right = window.innerWidth / 2
    camera.top = window.innerHeight / 2
    camera.bottom = -window.innerHeight / 2
    camera.updateProjectionMatrix()
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    resizeSvg()
  }
  
  const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  
  onMounted(() => {
    init()
    window.addEventListener('resize', onResize)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
  
  return { loadSvg }
}