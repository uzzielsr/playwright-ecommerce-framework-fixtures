import { test, expect } from '../../fixtures/api-fixtures';

/**
 * Test suite to automate CRUD operations for user accounts via API.
 * Verifies the full lifecycle of user creation, reading, updating, and deletion.
 */
test.describe('User Account CRUD API', () => {
    test('Performs full CRUD flow for a user via API', async ({
        userApi,
        testUser
    }) => {
        // Create a new user via API
        await userApi.createUser(testUser);

        // Read the user details to verify creation
        await userApi.readUser(testUser.email);

        // Update the user with new city information
        await userApi.updateUser(testUser.email, testUser.password, { city: 'Updated City' });

        // Delete the user to clean up
        await userApi.deleteUser(testUser.email, testUser.password);
    });
});