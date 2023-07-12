import React, { useState } from "react";
import { createEntry } from "../utils/dataFetching";
import { v4 as uuidv4 } from "uuid";

const EditDirectory = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [, setRemoved] = useState(false);

  const [entryData, setEntryData] = useState({
    category: "",
    firstName: "",
    name: "",
    profession: "",
    tagline: "",
    addresses: [] as { address: string; phone: string }[],
    email: "",
    url: "",
    relatedPain: [] as { _ref: string; _key: any }[],
    isValidated: false,
  });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEntryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAddressChange = (index: number, field: string, value: string) => {
    setEntryData((prevData) => {
      const updatedAddresses = prevData.addresses.map((address, i) => {
        if (i === index) {
          return {
            ...address,
            [field]: value,
            _key: uuidv4(),
          };
        }
        return address;
      });

      return {
        ...prevData,
        addresses: updatedAddresses,
      };
    });
  };
  const handleRelatedPainsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { options } = e.target;
    const value = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => ({ _ref: option.value, _key: uuidv4() }));

    setEntryData((prevData) => ({
      ...prevData,
      relatedPain: value,
    }));
  };
  const handleRemoveAddress = (index: number) => {
    setEntryData((prevData) => {
      const updatedAddresses = prevData.addresses.filter((_, i) => i !== index);
      return {
        ...prevData,
        addresses: updatedAddresses,
      };
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transformedData = {
      _id: uuidv4(),
      itemType: "",
      ...entryData,
      relatedPain: entryData.relatedPain.map((pain) => ({
        _type: "reference",
        _ref: pain._ref,
        _key: uuidv4(),
      })),
    };

    createEntry(transformedData);

    setIsSuccess(true);
    setEntryData({
      category: "",
      firstName: "",
      name: "",
      profession: "",
      tagline: "",
      addresses: [],
      email: "",
      url: "",
      relatedPain: [],
      isValidated: false,
    });

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <>
      <h2>Annuaire</h2>

      <p className="bigger-text">
        Nous recherchons <u>des spécialistes dans les douleurs de la vulve</u>{" "}
        qui font preuve d’un véritable soutien et d’une expérience positive
      </p>

      <p>
        ... ainsi que des associations, des boutiques en ligne, des plateformes
        web, etc. Une suggestion ? Fais-nous en part via le formulaire
        ci-dessous. Une fois validée par notre équipe, elle apparaîtra dans{" "}
        <a href="ressources/annuaire">notre annuaire</a>.
      </p>
      <div className="buttons-container">
        <button>Ajouter</button>
        <button disabled>Modifier</button>
        <button disabled>Supprimer</button>
      </div>
      <p className="msg info">
        Les entrées marquée d’une astérisque <span className="colored">*</span>{" "}
        sont obligatoires.
      </p>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <label htmlFor="category">Catégorie</label>
            <select
              id="category"
              name="category"
              value={entryData.category}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez une option</option>
              <option value="sexology">Sexologie</option>
              <option value="medical">Médical</option>
              <option value="shop">Boutique/E-Shop</option>
              <option value="association">Association</option>
              <option value="website">Plateforme digitale</option>
            </select>
          </div>

          <div className="form-section">
            <label className="required" htmlFor="name">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={entryData.name}
              onChange={handleInputChange}
              placeholder="Nom"
            />
          </div>

          {(entryData.category === "sexology" ||
            entryData.category === "medical") && (
            <>
              <div className="form-section">
                <label className="required" htmlFor="firstName">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={entryData.firstName}
                  onChange={handleInputChange}
                  placeholder="Prénom"
                />
              </div>
              <div className="form-section">
                <label className="required" htmlFor="profession">
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  name="profession"
                  value={entryData.profession}
                  onChange={handleInputChange}
                  placeholder="sexologue, gynécologue, sage-femme, etc."
                />
              </div>
            </>
          )}

          {(entryData.category === "shop" ||
            entryData.category === "association" ||
            entryData.category === "website") && (
            <div className="form-section">
              <label className="required" htmlFor="tagline">
                Accroche
              </label>
              <input
                type="text"
                id="tagline"
                name="tagline"
                value={entryData.tagline}
                onChange={handleInputChange}
                placeholder="Description brève de l'activité"
              />
            </div>
          )}

          {entryData.category === "shop" && (
            <div className="form-section addresses">
              <div className="form-section" style={{ borderBottom: "none" }}>
                <label>Adresses</label>
                <button
                  style={{ fontSize: "80%" }}
                  type="button"
                  onClick={() => {
                    setEntryData((prevData) => ({
                      ...prevData,
                      addresses: [
                        ...prevData.addresses,
                        { address: "", phone: "" },
                      ],
                    }));
                    setRemoved(false);
                  }}
                >
                  Ajouter
                </button>
              </div>

              {entryData.addresses.map((address, index) => (
                <div className="address" key={index}>
                  <div className="form-section">
                    <label htmlFor="street">Adresse</label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      placeholder="Rue, numéro, code postal, ville"
                      value={address.address}
                      onChange={(e) =>
                        handleAddressChange(index, "address", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                      name="phone"
                      id="phone"
                      type="text"
                      placeholder="+41 ..."
                      value={address.phone}
                      onChange={(e) =>
                        handleAddressChange(index, "phone", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    style={{
                      border: "none",
                      width: "fit-content",
                    }}
                    onClick={() => {
                      handleRemoveAddress(index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="form-section">
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={entryData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-section">
            <label htmlFor="url">URL</label>
            <input
              placeholder="https://..."
              type="text"
              id="url"
              name="url"
              value={entryData.url}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-section">
            <label htmlFor="relatedPain">Douleur(s) concernée(s)</label>
            <select
              multiple
              id="relatedPain"
              name="relatedPain"
              onChange={handleRelatedPainsChange}
            >
              <option value="">Pas de douleur particulière</option>
              <option value="acbe9df3-2e1d-4839-bf81-31438ee48de0">
                Vaginisme
              </option>
              <option value="690458bf-5d58-4712-b71a-ce30457c88ba">
                Endométriose
              </option>
              <option value="3f7ab020-b645-458b-b815-a5b5bcf8e265">
                Syndrome des ovaires polykistiques
              </option>
              <option value="6c64bde9-f4e4-4728-88f3-66a07bc43536">
                Lichen Scléreux
              </option>
              <option value="4e092ac6-a9dd-4f60-a738-a8f39bab768f">
                Vaginite et mycose
              </option>
              <option value="3494d637-5a3c-485f-a02e-1fe9eef220e8">
                Sécheresse vaginale
              </option>
              <option value="c3b0deea-22d5-4350-9698-5f37d063adbb">
                Utérus rétroversé
              </option>
              <option value="1a2f5d6e-655a-4eee-a71f-1cf6ca2a9bdb">
                Vulvodynie
              </option>
            </select>
          </div>

          <button
            disabled={
              entryData.category === "" ||
              entryData.name === "" ||
              entryData.email === "" ||
              (entryData.category === "medical" &&
                entryData.firstName === "") ||
              (entryData.category === "medical" &&
                entryData.profession === "") ||
              (entryData.category === "sexology" &&
                entryData.profession === "") ||
              (entryData.category === "sexology" &&
                entryData.firstName === "") ||
              (entryData.category === "shop" && entryData.tagline === "") ||
              (entryData.category === "association" &&
                entryData.tagline === "") ||
              (entryData.category === "website" && entryData.tagline === "") ||
              entryData.relatedPain.length === 0
            }
            type="submit"
            onClick={handleSubmit}
          >
            Proposer
          </button>
          {isSuccess && (
            <p className="msg success">
              Votre proposition nous est parvenue avec succès. Nous allons la
              réviser avant de la publier.
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default EditDirectory;
