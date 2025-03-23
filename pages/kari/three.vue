<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

const container = ref(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ alpha: true })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value.appendChild(renderer.domElement)

  const loader = new SVGLoader()
  loader.load('/kari/svg/kari_10.svg', (data) => {
    const paths = data.paths
    const group = new THREE.Group()

    paths.forEach((path) => {
      const material = new THREE.MeshBasicMaterial({ color: path.color, side: THREE.DoubleSide })
      const shapes = SVGLoader.createShapes(path)

      shapes.forEach((shape) => {
        const geometry = new THREE.ShapeGeometry(shape)
        const mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)
      })
    })

    scene.add(group)
    group.position.set(-100, -100, 0)

    const animate = () => {
      // requestAnimationFrame(animate)
      // group.rotation.y += 0.01 // Y축 회전 애니메이션
      renderer.render(scene, camera)
    }

    animate()
  })

  camera.position.z = 500
})
</script>

<template>
  <div ref="container" bg-black></div>
</template>
