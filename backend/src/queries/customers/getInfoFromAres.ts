import fetch from 'node-fetch';
import xml2js from 'xml2js';
import { ApolloError } from 'apollo-server-express';

const aresSubstr = (name: string) => {
  const croppedName = name.split(':')[1];
  return croppedName && croppedName.toLowerCase();
};

export const getInfoFromAres = async (identificationNumber: string) => {
  try {
    const rawResponse = await fetch(
      `http://wwwinfo.mfcr.cz/cgi-bin/ares/darv_bas.cgi?ico=${identificationNumber}`,
    );
    const xml = await rawResponse.text();
    const parsedXML = await xml2js.parseStringPromise(xml, {
      normalizeTags: true,
      ignoreAttrs: true,
      tagNameProcessors: [aresSubstr],
      attrNameProcessors: [aresSubstr],
    });

    if (Number(parsedXML.ares_odpovedi.odpoved[0].pza[0]) < 1) {
      throw new ApolloError('Not found in ARES.', 'INFO_NOT_FOUND');
    }

    const record = parsedXML.ares_odpovedi.odpoved[0].vbas[0];
    return {
      identificationNumber: record.ico[0] as string | undefined,
      taxIdentificationNumber: record.dic[0] as string | undefined,
      name: record.of[0] as string | undefined,
      street: record.ad[0].uc[0] as string | undefined,
      city: record.aa[0].n[0] as string | undefined,
      postNumber: record.aa[0].psc[0] as string | undefined,
    };
  } catch (err) {
    if (err instanceof ApolloError) {
      throw err;
    }
    throw new Error('Error while searching in ARES.');
  }
};
