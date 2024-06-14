import Jazzicon from '@raugfer/jazzicon'
import Image from 'next/image'

// builds an image data url for embedding
function buildDataUrl(address: string): string {
  return 'data:image/svg+xml;base64,' + btoa(Jazzicon(address))
}

// sample code for react component
export default function JazziconImage({ address, className }: { address: string; className?: string }) {
  const imageUrl = buildDataUrl(address)
  return <Image width="6" height="6" src={imageUrl} alt="JazzIcon" className={className} />
}
