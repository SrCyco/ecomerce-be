import express, { Request, Response } from 'express';
import place, { Place } from '../models/place';

import { CallbackError, Error } from 'mongoose';

const app = express();

export const findPlaceById = async (placeId: string): Promise<string> => {
  try {
    const findedPlace = await place.findOne({ placeId });
    console.log(findedPlace);
    return findedPlace ? findedPlace._id : undefined;
  } catch (error: any) {
    throw new Error(error);
  }
};

app.post('/place', async (req: Request<any, any, Place>, res: Response) => {
  const body = req.body;
  const {
    countryId,
    departmentId,
    cityId,
    addressId,
    type,
    description,
    additionalInfo,
  } = body;
  let findedCountryId;
  let findedDepartmentId;
  let findedCityId;
  let findedAddressId;

  try {
    findedCountryId = countryId ? await findPlaceById(countryId) : countryId;
    findedDepartmentId = departmentId
      ? await findPlaceById(departmentId)
      : departmentId;
    findedCityId = cityId ? await findPlaceById(cityId) : cityId;
    findedAddressId = addressId ? await findPlaceById(addressId) : addressId;
  } catch (error: any) {
    throw new Error(error);
  }

  const newPlace = new place({
    countryId: findedCountryId,
    departmentId: findedDepartmentId,
    cityId: findedCityId,
    addressId: findedAddressId,
    type,
    description,
    additionalInfo,
  });

  newPlace.save((error: CallbackError, savedPlace: Place) => {
    if (error) {
      return res.status(500).json({
        ok: false,
        error,
      });
    }

    if (!savedPlace) {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'Place not found',
        },
      });
    }

    return res.json({
      ok: true,
      place: savedPlace,
    });
  });
});

export default app;
