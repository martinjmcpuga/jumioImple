import Select from 'react-select';
import './flags.css';

const country = [
  {
    "label": "Mexico",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png",
    "value": "MX"
  },
  {
    "label": "Argentina",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1920px-Flag_of_Argentina.svg.png",
    "value": "AR"
  },
  {
    "label": "Brasil",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1920px-Flag_of_Brazil.svg.png",
    "value": "BR"
  },
  {
    "label": "Chile",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/1920px-Flag_of_Chile.svg.png",
    "value": "CL"
  },
  {
    "label": "Japan",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1920px-Flag_of_Japan.svg.png",
    "value": "JP"
  },
  {
    "label": "United States",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png",
    "value": "US"
  }
];

export default function Flags() {

  const handleChange = (selectedOption) => {
    const setSelectedOption = selectedOption.value;
  };

  const style = {
    control: base => ({
      ...base,
      height: "52px !important",
      borderRadius: "0.375rem !important",
      boxShadow: "none !important",
      borderColor: "#c4cbd1 !important",
      "&:hover": {
        borderColor: "#c4cbd1 !important"
      }

    })
  };

  return (
    <Select 
    options={country} 
    onChange={handleChange} 
    styles={style}
    formatOptionLabel={country => (
      <div className="containerNac"> 
        <div className="pais">{country.value} {country.label}</div>
        <div className="paisBandera">
          <img className="bandera" src={country.image}/> 
        </div>
      </div>
    )}
    placeholder="Seleccionar nacionalidad"
    />

    // <Select
    //   styles={style}
    //   options={country}
    //   onChange={handleChange}
    //   value={{ value: 'MX', label: 'Mexico', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/1920px-Flag_of_Mexico.svg.png' }}
    //   formatOptionLabel={country => (
    //     <div className="containerDom">
    //       <div className="pais">{country.value} {country.label}</div>
    //       <div className="paisBandera">
    //         <img className="bandera" src={country.image} />
    //       </div>
    //     </div>
    //   )}
    //   placeholder="Selecciona tu País"
    // />
  );
}