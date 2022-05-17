import { render } from "@testing-library/react";
import { UsersManagement } from "./UsersManagement";

const containerSpy = jest.fn();
const providerSpy = jest.fn();

jest.mock("./containers", () => ({
  UsersManagementContainer: containerSpy
}));

jest.mock("./providers", () => ({
  WithUsersManagement: providerSpy
}));

describe("<UsersManagement />", () => {
  it("builds module with container and logic manager", () => {
    const content = render(<UsersManagement />);

    expect(containerSpy).toBeCalled();
    expect(providerSpy).toBeCalled();
  });
});
