const API = process.env.API_URL;

describe("API Unit Test (Mocked)", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: async () => ({ message: "success" })
      })
    );
  });

  test("API should return success response", async () => {
    const res = await fetch(API);

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.message).toBe("success");
  });
});