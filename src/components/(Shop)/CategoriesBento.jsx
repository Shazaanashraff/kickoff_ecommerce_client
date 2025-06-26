import React from 'react'
import img1 from '../../assets/images.jpg'
import img2 from '../../assets/428df5dc.webp'
import img3 from '../../assets/Arsenal.jpg'
import img4 from '../../assets/realMadrid.jpg'
import img5 from '../../assets/womens.jpg'

const categories = [
  {
    name: 'International Kits',
    desc: 'Shop the latest national team jerseys from around the world.',
    image: img1,
    size: 'row-span-2',
  },
  {
    name: 'Retro Kits',
    desc: 'Classic throwback jerseys for true collectors.',
    image: img2,
    size: '',
  },
  {
    name: 'Premier League 24/25',
    desc: 'Get the newest Premier League season kits.',
    image: img3,
    size: '',
  },
  {
    name: 'LaLiga Kits',
    desc: 'Official jerseys from Spain\'s top clubs.',
    image: img4,
    size: '',
  },
  {
    name: "Women's Kits",
    desc: 'Top picks for women\'s football fans.',
    image: img5,
    size: '',
  },
]

const CategoriesBento = () => {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-sans tracking-tight">
        Shop by Category
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {/* International Kits - tall tile on left */}
        <div className="relative rounded-3xl overflow-hidden bg-black/60 shadow-lg row-span-2">
          <img src={categories[0].image} alt={categories[0].name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 h-full w-full p-5 flex items-start justify-start">
            <div>
              <h3 className="text-2xl font-bold text-white drop-shadow-lg">{categories[0].name}</h3>
              <p className="text-white/80 text-sm mt-1 drop-shadow">{categories[0].desc}</p>
            </div>
          </div>
        </div>

        {/* Retro Kits */}
        <div className="relative rounded-3xl overflow-hidden bg-black/60 shadow-lg">
          <img src={categories[1].image} alt={categories[1].name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 h-full w-full p-5 flex items-start justify-start">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{categories[1].name}</h3>
              <p className="text-white/80 text-sm mt-1 drop-shadow">{categories[1].desc}</p>
            </div>
          </div>
        </div>

        {/* Premier League 24/25 */}
        <div className="relative rounded-3xl overflow-hidden bg-black/60 shadow-lg">
          <img src={categories[2].image} alt={categories[2].name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 h-full w-full p-5 flex items-start justify-start">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{categories[2].name}</h3>
              <p className="text-white/80 text-sm mt-1 drop-shadow">{categories[2].desc}</p>
            </div>
          </div>
        </div>

        {/* LaLiga Kits */}
        <div className="relative rounded-3xl overflow-hidden bg-black/60 shadow-lg">
          <img src={categories[3].image} alt={categories[3].name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 h-full w-full p-5 flex items-start justify-start">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{categories[3].name}</h3>
              <p className="text-white/80 text-sm mt-1 drop-shadow">{categories[3].desc}</p>
            </div>
          </div>
        </div>

        {/* Women's Kits */}
        <div className="relative rounded-3xl overflow-hidden bg-black/60 shadow-lg">
          <img src={categories[4].image} alt={categories[4].name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="relative z-10 h-full w-full p-5 flex items-start justify-start">
            <div>
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{categories[4].name}</h3>
              <p className="text-white/80 text-sm mt-1 drop-shadow">{categories[4].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoriesBento
