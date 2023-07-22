import CountryInfo from "./CountryInfo";
import CountryList from "./CountryList";

const Content = ({ countries, handleShowCountry }) => {
  switch (true) {
    case countries.length > 10:
      return <p>Too many matches, specify anothe filter</p>;

    case countries.length === 1:
      return <CountryInfo country={countries[0]} />;

    case countries.length > 0 && countries.length <= 10:
      return (
        <CountryList  countries={countries} handleShowCountry={handleShowCountry} />
      );

    default:
      return <p>No results found</p>;
  }
};

export default Content;
