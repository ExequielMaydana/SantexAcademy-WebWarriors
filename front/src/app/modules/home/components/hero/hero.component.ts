import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {

  imageUrls: string[] = [

    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232276/xAcademy/Webp/hero-0_uwtaqg.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232279/xAcademy/Webp/hero-1_krr35e.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232286/xAcademy/Webp/hero-2_apb6by.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232275/xAcademy/Webp/hero-3_upqjhk.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232289/xAcademy/Webp/hero-4_tnmj5v.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232278/xAcademy/Webp/Hero-5_g3aqro.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232276/xAcademy/Webp/Hero-6_mhffqe.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232272/xAcademy/Webp/Hero-7_nbgchi.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232275/xAcademy/Webp/Hero-8_gu46vp.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232274/xAcademy/Webp/Hero-9_wtsvb7.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232273/xAcademy/Webp/Hero-10_i2foif.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232274/xAcademy/Webp/Hero-11_v1e0qq.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232275/xAcademy/Webp/Hero-12_z0q0zg.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232273/xAcademy/Webp/Hero-13_eev717.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232272/xAcademy/Webp/Hero-14_fgcuab.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232273/xAcademy/Webp/Hero-15_eanbtx.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232274/xAcademy/Webp/Hero-16_xacqnn.webp",
    "https://res.cloudinary.com/carina-bosio/image/upload/v1697232274/xAcademy/Webp/Hero-17_zk4fng.webp",

  ];

  // Dividir las imágenes en bloques de 6
  imageBlocks: string[][] = [];

  constructor() {
    this.imageBlocks = this.chunkArray(this.imageUrls, 6);
  }

  private chunkArray(array: string[], chunkSize: number): string[][] {
    const chunks: string[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

}
