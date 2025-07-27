import React from "react";
import Fit from '../../assets/Compare/Fit.webp';
import Token from '../../assets/Compare/Token.webp';
import Kit from '../../assets/Compare/Kit.webp';
import Material from '../../assets/Compare/Material.webp';
import Badge from '../../assets/Compare/Badge.webp';

const playerImg = "https://via.placeholder.com/300x400?text=Player+Version";
const fanImg = "https://via.placeholder.com/300x400?text=Fan+Version";

const sections = [
  {
    title: "Fit",
    player: (
      <span>
        <strong>Athletic slim-fit</strong> designed for performance and speed. Hugs the body for minimal drag.
      </span>
    ),
    fan: (
      <span>
        <strong>Relaxed fit</strong> for comfort and everyday wear. Roomier through the chest and waist.
      </span>
    ),
    note: "Player version runs small – consider sizing up 1 size.",
    image: Fit,
  },
  {
    title: "Fabric & Technology",
    player: (
      <span>
        Lightweight, breathable, moisture-wicking fabric with advanced ventilation zones and heat-transfer technology.
      </span>
    ),
    fan: (
      <span>
        Standard polyester or cotton blend. Comfortable, but less technical than player version.
      </span>
    ),
    image: Material,
  },
  {
    title: "Logos / Badges",
    player: (
      <span>
        Heat-pressed, lightweight, and seamless for zero irritation and reduced weight.
      </span>
    ),
    fan: (
      <span>
        Embroidered or stitched for a classic look and extra durability.
      </span>
    ),
    image: Badge,
  },
  {
    title: "Sizing",
    player: (
      <span>
        Slim, tailored cut. <span className="font-semibold text-red-500">Runs small</span>.
      </span>
    ),
    fan: (
      <span>
        True to size or slightly loose. Easier to find your usual fit.
      </span>
    ),
    note: "If in doubt, size up for the player version.",
    image: Kit,
  },
  {
    title: "Durability & Care",
    player: (
      <span>
        Lightweight materials may require gentle washing. Avoid high heat and harsh detergents.
      </span>
    ),
    fan: (
      <span>
        More robust for frequent wear and washing. Easier care instructions.
      </span>
    ),
    image: Token,
  },
  {
    title: "Pricing",
    player: (
      <span>
        Higher price due to advanced tech and authentic match-day details.
      </span>
    ),
    fan: (
      <span>
        More affordable, great value for fans and collectors.
      </span>
    ),
  },
  {
    title: "Who Should Buy Which?",
    player: (
      <span>
        <strong>Player Version:</strong> For athletes, collectors, or those wanting the exact on-pitch experience.
      </span>
    ),
    fan: (
      <span>
        <strong>Fan Version:</strong> For everyday wear, comfort, and showing support at games or casually.
      </span>
    ),
  },
];

const ProductComparison = () => (
  <div className="bg-gray-50 min-h-screen">
    {/* Hero Section */}
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-16 mt-17">
          Player Version / Fan Version
        </h1>
      </div>
    </section>


    {/* Comparison Sections */}
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      {sections.map((section, idx) => (
        <div
          key={section.title}
          className={`grid md:grid-cols-2 gap-6 py-8 px-4 md:px-8 rounded-xl mb-8 ${
            idx % 2 === 0 ? "bg-white" : "bg-gray-100"
          }`}
        >
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h2>
            <div className="mb-2">{section.player}</div>
            {section.note && (
              <div className="text-sm text-yellow-600 font-medium mt-2">{section.note}</div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 invisible md:visible">{section.title}</h2>
            <div className="mb-2">{section.fan}</div>
          </div>
          {/* Section image, if present */}
          {section.image && (
            <div className="md:col-span-2 flex justify-center mt-4">
              <img src={section.image} alt={section.title + ' illustration'} className="w-full max-w-md rounded-lg" />
            </div>
          )}
        </div>
      ))}
    </section>

    {/* Conclusion & CTA */}
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Which Jersey Will You Choose?
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Whether you want the authentic match-day experience or a comfortable everyday supporter’s jersey, both versions let you show your passion for the game. Shop now and wear your colors with pride!
      </p>
      <button
        className="px-8 py-4 bg-gray-800 text-white text-lg font-semibold rounded-xl hover:bg-gray-700 transition"
        onClick={() => window.location.href = "/products"}
      >
        Shop Both Versions
      </button>
    </section>
  </div>
);

export default ProductComparison;
