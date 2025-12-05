import { useState } from 'react';
import PageTutoriel from './PageTutoriel';
import { FaDiagramNext } from 'react-icons/fa6';
import { MdArrowRight, MdSkipNext } from 'react-icons/md';
import img1 from '../assets/img/1.png';
import img2 from '../assets/img/2.png';
import img3 from '../assets/img/3.png';
import { useEffect } from 'react';

export default function Tutorial() {
  const [showTuto, setShowTuto] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [pages, setPages] = useState([
    <PageTutoriel
      title={'Parcourez la carte !'}
      desc={
        'Sur cette carte vous trouverez différentes alertes ! \n Prenez des décisions pour le bien de votre établissement.'
      }
      img={img1}
    />,
    <PageTutoriel
      title={'Faites des choix'}
      desc={
        "Pour résoudre les différentes alertes, vous devrez prendre des décisions. Choisir des solutions open-source vous rapportera plus sur le long terme, tandis que l'utilisation de logiciels fermés pourrait s'avérer coûteuse"
      }
      img={img2}
    />,
    <PageTutoriel
      title={'Un assistant ?'}
      desc={
        "Dites bonjour à Chat'Bruti, un assistant un peu débile qui sera là pour vous orienter vers les mauvais choix..."
      }
      img={img3}
    />,
  ]);

  useEffect(()=>pageNumber>=pages.length?setShowTuto(false):setShowTuto(true),[pageNumber])
  //   useEffect(() => {
  //     localStorage.clear();
  //     if (!localStorage.getItem('tuto')) {
  //       localStorage.setItem('tuto', true);
  //       setShowTuto(true);
  //     }
  //   }, []);
  if (!showTuto) return;
  else
    return (
      <section className="size-full absolute z-30 flex justify-center items-center ">
        <section className="w-2/3 h-2/3 bg-white rounded-2xl">
          {pages[pageNumber]}
          <footer className="flex justify-between items-center p-3.5">
            <aside></aside>
            <section className="flex flex-row">
              {pages.map((e, i) => {
                return (
                  <span
                    onClick={() => setPageNumber(i)}
                    key={i}
                    className={`${pageNumber == i ? 'text-blue-500' : 'text-gray-400'} text-4xl`}
                  >
                    •
                  </span>
                );
              })}
            </section>
            <MdArrowRight
              className="text-3xl transition-all cursor-pointer hover:bg-gray-200 p-1 rounded-full"
              onClick={() => setPageNumber((o) => o + 1)}
            />
          </footer>
        </section>
      </section>
    );
}
