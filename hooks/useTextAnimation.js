import { useEffect } from 'react'
import anime from 'animejs'

export default function useTextAnimation(ref, dependency, animationType) {
  useEffect(() => {
    if (ref.current) {
      const splitTextWithLineBreaks = (element) => {
        const parts = element.innerHTML.split('，')
        element.innerHTML = ''

        parts.forEach((part, index) => {
          const chars = part
            .split('')
            .map((char) => `<span>${char}</span>`)
            .join('')
          element.innerHTML += chars
          if (index < parts.length - 1) {
            element.innerHTML += '，<br>'
          }
        })
      }

      splitTextWithLineBreaks(ref.current)

      switch (animationType) {
        case 'fadeInRight':
          anime({
            targets: `span`,
            opacity: [0, 1],
            translateY: [0, 0],
            translateX: [-50, 0],
            delay: anime.stagger(50),
            easing: 'easeOutExpo',
          })
          break
        case 'fadeInUp':
          anime({
            targets: `${ref.current.className} span`,
            opacity: [0, 1],
            translateY: [-40, 0],
            delay: anime.stagger(50),
            easing: 'easeOutExpo',
          })
          break

        default:
          console.warn('Unsupported animation type')
          break
      }
    }
  }, [ref, dependency, animationType])
}
