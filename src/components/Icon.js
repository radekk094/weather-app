import React from 'react';

import im01d from '../images/01d.png';
import im02d from '../images/02d.png';
import im03d from '../images/03d.png';
import im04d from '../images/04d.png';
import im09d from '../images/09d.png';
import im10d from '../images/10d.png';
import im11d from '../images/11d.png';
import im13d from '../images/13d.png';
import im50d from '../images/50d.png';

import im01n from '../images/01n.png';
import im02n from '../images/02n.png';
import im03n from '../images/03n.png';
import im04n from '../images/04n.png';
import im09n from '../images/09n.png';
import im10n from '../images/10n.png';
import im11n from '../images/11n.png';
import im13n from '../images/13n.png';
import im50n from '../images/50n.png';

// array with all icons of weather conditions
const images = [
    { id: "01d", src: im01d, alt: "Bezchmurnie" },
    { id: "02d", src: im02d, alt: "Zachmurzenie niewielkie" },
    { id: "03d", src: im03d, alt: "Zachmurzenie umiarkowane" },
    { id: "04d", src: im04d, alt: "Zachmurzenie duże" },
    { id: "09d", src: im09d, alt: "Niewielkie opady deszczu" },
    { id: "10d", src: im10d, alt: "Obfite opady deszczu" },
    { id: "11d", src: im11d, alt: "Przejściowe burze" },
    { id: "13d", src: im13d, alt: "Opady śniegu" },
    { id: "50d", src: im50d, alt: "Mgła" },
    { id: "01n", src: im01n, alt: "Bezchmurnie" },
    { id: "02n", src: im02n, alt: "Zachmurzenie niewielkie" },
    { id: "03n", src: im03n, alt: "Zachmurzenie umiarkowane" },
    { id: "04n", src: im04n, alt: "Zachmurzenie duże" },
    { id: "09n", src: im09n, alt: "Niewielkie opady deszczu" },
    { id: "10n", src: im10n, alt: "Obfite opady deszczu" },
    { id: "11n", src: im11n, alt: "Przejściowe burze" },
    { id: "13n", src: im13n, alt: "Opady śniegu" },
    { id: "50n", src: im50n, alt: "Mgła" }
]

// component, which returns icon, based in icon id
const Icon = (props) => {
    const { title, iconId } = props;

    const selectedImage = images.filter(image => (image.id === iconId));

    return (
        <>
            {title ? (<>{selectedImage[0].alt}<br /></>) : null}
            <img src={selectedImage[0].src} alt={selectedImage[0].alt} />
        </>
    );
}

export default Icon;