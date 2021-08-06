import express, { Request, Response } from 'express';
import Place from '../models/place';

import { Error, Types } from 'mongoose';
import { Place as PlaceType } from '../types/types';

const app = express();

export const findPlaceById = async (placeId: string): Promise<string> => {
  try {
    const findedPlace = await Place.findOne({ placeId });
    console.log(findedPlace);
    return findedPlace._id;
  } catch (error: any) {
    throw new Error(error);
  }
};

app.post('/place', async (req: Request, res: Response) => {
  const body = req.body;
  const { placeId, countryId, departmentId, cityId, type, name } = body;
  let findedCountryId;
  let findedDepartmentId;
  let findedCityId;

  try {
    findedCountryId = countryId ? await findPlaceById(countryId) : countryId;
    findedDepartmentId = departmentId
      ? await findPlaceById(departmentId)
      : departmentId;
    findedCityId = cityId ? await findPlaceById(cityId) : cityId;
  } catch (error: any) {
    throw new Error(error);
  }

  const place = new Place({
    placeId,
    countryId: findedCountryId,
    departmentId: findedDepartmentId,
    cityId: findedCityId,
    type,
    name,
  });

  place.save((error: Error, savedPlace: PlaceType) => {
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
