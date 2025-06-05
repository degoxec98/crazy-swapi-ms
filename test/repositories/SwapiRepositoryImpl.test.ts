import {
 SwapiRepositoryImpl,
 SwapiRepositoryProps,
} from "../../src/repositories/SwapiRepositoryImpl";

describe("SwapiRepositoryImpl", () => {
  describe("findCharacterByCode", () => {
    it("should return character by code", async () => {
      // Prepare
      const httpClientMock = {
        get: jest.fn(() => 
          Promise.resolve({
            data: {
              code: "code",
              name: "Luke Skywalker",
              height: "172",
              mass: "77",
              gender: "Male",
              homeworld: "homeworldUrl",
            },
          }),
        ),
      };

      const swapiRepository = new SwapiRepositoryImpl({
        httpClient: httpClientMock,
        config: {
          baseUrl: "baseUrl",
        },
      } as unknown as SwapiRepositoryProps);

      // Execute
      const response = await swapiRepository.findCharacterByCode("code");

      // Validate
      expect(response).toEqual({
        code: "code",
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        gender: "Male",
        homeworld: "homeworldUrl",
      });

      expect(httpClientMock.get).toHaveBeenCalledWith(
        "baseUrl/people/code",
      );
    });
  });

  describe("findPlanetByUrl", () => {
    it("should return planet by url", async () => {
      // Prepare
      const httpClientMock = {
        get: jest.fn(() => 
          Promise.resolve({
            data: {
              url: "homeworldUrl",
              name: "Tatooine",
              population: "200000",
              diameter: "10465",
              gravity: "1 standard",
              terrain: "desert",
            },
          }),
        ),
      };

      const swapiRepository = new SwapiRepositoryImpl({
        httpClient: httpClientMock,
        config: {
          baseUrl: "baseUrl",
        },
      } as unknown as SwapiRepositoryProps);

      // Execute
      const response = await swapiRepository.findPlanetByUrl("homeworldUrl");

      // Validate
      expect(response).toEqual({
        url: "homeworldUrl",
        name: "Tatooine",
        population: "200000",
        diameter: "10465",
        gravity: "1 standard",
        terrain: "desert",
      });

      expect(httpClientMock.get).toHaveBeenCalledWith("homeworldUrl");
    });
  });
});