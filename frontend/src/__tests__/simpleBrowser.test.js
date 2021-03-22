jest.setTimeout(120000);

const port = +(process.env.TEST_PORT || 8080);

describe('Simple Browser Tests', () => {
   beforeAll(async () => {
      await page.goto(`http://localhost:${port}`);
   });

   it('can open project', async () => {
      await expect(page).toFill('#username', 'admin');
      await expect(page).toFill('#password', '1234');
      await expect(page).toClick('#login');
      await expect(page).toMatch('Server information');

      await expect(page).toFill('#url', 'http://cmpt373-1211-14.cmpt.sfu.ca:8929/root/naufal-276');
      await expect(page).toFill('#token', 'XQUSyUSDiQUxsy6CoP8_');
      await expect(page).toClick('#create-config');
      await expect(page).toMatch('Project List', { timeout: 60000 });

      const row = await expect(page).toMatchElement('.MuiDataGrid-row', { text: 'naufal-276' });
      const checkbox = await row.$('input[type="checkbox"]');
      await checkbox.evaluate(checkbox => checkbox.click());
      await expect(page).toClick('#select-project');
      await expect(page).toMatch('Project Overview', { timeout: 60000 });
   });
});