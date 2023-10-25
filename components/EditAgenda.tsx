import React, { useState } from "react";

const EditAgenda = () => {
  const [formData, setFormData] = useState({
    title: "",
    eventDuration: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventStartDate: "",
    eventEndDate: "",
    shortDef: "",
    longDef: "",
    organizer: "",
    website: "",
    eventLocation: "",
    address: "",
    city: "",
    region: "",
    zoomLink: "",
    reservations: {
      telephone: "",
      email: "",
    },
    eventPrice: "",
    eventPriceType: "",
    uniquePrice: 0,
    minPrice: 0,
    maxPrice: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>Agenda</h2>
      <p className="bigger-text">
        Nous souhaitons mettre en lumières des{" "}
        <u>évènements autour des douleurs sexuelles</u> qui ont lieu en Suisse
        Romande.
      </p>
      <p>
        Une suggestion ? Fais-nous en part via le formulaire ci-dessous. Une
        fois validée par notre équipe, elle apparaîtra dans{" "}
        <a href="ressources/agenda">notre agenda</a>.
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

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="required" htmlFor="title">
            Nom de l’évènement
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Nom de l’évènement"
          />
        </div>

        <div className="form-section">
          <label className="required" htmlFor="eventDuration">
            Durée
          </label>
          <select
            id="eventDuration"
            name="eventDuration"
            value={formData.eventDuration}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="un jour">Un jour</option>
            <option value="plusieurs jours">Plusieurs jours</option>
          </select>
        </div>

        {formData.eventDuration === "un jour" && (
          <>
            <div className="form-section">
              <label className="required" htmlFor="eventDate">
                Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-section">
              <label className="required" htmlFor="eventStartTime">
                Heure de début
              </label>
              <input
                type="time"
                id="eventStartTime"
                name="eventStartTime"
                value={formData.eventStartTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <label className="required" htmlFor="eventEndTime">
                Heure de fin
              </label>
              <input
                type="time"
                id="eventEndTime"
                name="eventEndTime"
                value={formData.eventEndTime}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {formData.eventDuration === "plusieurs jours" && (
          <>
            <div className="form-section">
              <label className="required" htmlFor="eventStartDate">
                Date de début
              </label>
              <input
                type="date"
                id="eventStartDate"
                name="eventStartDate"
                value={formData.eventStartDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <label className="required" htmlFor="eventEndDate">
                Date de fin
              </label>
              <input
                type="date"
                id="eventEndDate"
                name="eventEndDate"
                value={formData.eventEndDate}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="form-section">
          <label className="required" htmlFor="shortDef">
            En bref
          </label>
          <textarea
            id="shortDef"
            name="shortDef"
            value={formData.shortDef}
            onChange={handleChange}
            required
            placeholder="Courte description de l’évènement"
          ></textarea>
        </div>

        <div className="form-section">
          <label htmlFor="longDef">En détails</label>
          <textarea
            id="longDef"
            name="longDef"
            value={formData.longDef}
            onChange={handleChange}
            placeholder="Description détaillée de l’évènement"
          ></textarea>
        </div>

        <div className="form-section">
          <label className="required" htmlFor="organizer">
            Organisé par
          </label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
            placeholder="Nom de l’organisateur·ice"
          />
        </div>

        <div className="form-section">
          <label className="required" htmlFor="website">
            Site internet
          </label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-section">
          <label htmlFor="eventLocation">Format</label>
          <select
            id="eventLocation"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="Sur place">Sur place</option>
            <option value="En ligne">En ligne</option>
          </select>
        </div>

        {formData.eventLocation === "Sur place" && (
          <>
            <div className="form-section">
              <label className="required" htmlFor="address">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Rue, numéro"
              />
            </div>

            <div className="form-section">
              <label className="required" htmlFor="city">
                Lieu
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="PLZ, Lieu"
              />
            </div>

            <div className="form-section">
              <label className="required" htmlFor="region">
                Canton
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un canton</option>
                <option value="Genève">Genève</option>
                <option value="Vaud">Vaud</option>
                <option value="Neuchâtel">Neuchâtel</option>
                <option value="Jura">Jura</option>
                <option value="Fribourg">Fribourg</option>
                <option value="Valais">Valais</option>
              </select>
            </div>
          </>
        )}

        {formData.eventLocation === "En ligne" && (
          <>
            <div className="form-section">
              <label className="required" htmlFor="zoomLink">
                Lien réunion
              </label>
              <input
                type="text"
                id="zoomLink"
                name="zoomLink"
                value={formData.zoomLink}
                onChange={handleChange}
                required
                placeholder="https://..."
              />
            </div>
          </>
        )}

        <div className="form-section">
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.reservations.telephone}
            onChange={handleChange}
            placeholder="+41(0)..."
          />
        </div>

        <div className="form-section">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.reservations.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="form-section">
          <label className="required" htmlFor="eventPrice">
            Tarif d’entrée
          </label>
          <select
            id="eventPrice"
            name="eventPrice"
            value={formData.eventPrice}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une option</option>
            <option value="gratuite">Gratuite</option>
            <option value="payante">Payante</option>
          </select>
        </div>

        {formData.eventPrice === "payante" && (
          <>
            <div className="form-section">
              <label htmlFor="eventPriceType">Type de tarification</label>
              <select
                id="eventPriceType"
                name="eventPriceType"
                value={formData.eventPriceType}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un type de tarification</option>
                <option value="fourchette">Fourchette</option>
                <option value="tarif unique">Tarif unique</option>
              </select>
            </div>

            {formData.eventPriceType === "tarif unique" && (
              <>
                <div className="form-section">
                  <label className="required" htmlFor="uniquePrice">
                    Tarif unique
                  </label>
                  <input
                    type="number"
                    id="uniquePrice"
                    name="uniquePrice"
                    value={formData.uniquePrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {formData.eventPriceType === "fourchette" && (
              <>
                <div className="form-section">
                  <label className="required" htmlFor="minPrice">
                    Prix min.
                  </label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={formData.minPrice}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-section">
                  <label className="required" htmlFor="maxPrice">
                    Prix max.
                  </label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
          </>
        )}

        <button type="submit">proposer</button>
      </form>
    </>
  );
};

export default EditAgenda;
