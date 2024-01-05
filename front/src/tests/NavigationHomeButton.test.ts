import NavigateHomeButton from "../components/NavigationButtons/NavigateHomeButton";
import { render, screen, fireEvent } from "@testing-library/react";
import * as router from "react-router";

describe("Test NavigationHomeButton", () => {
    test("When NavigationHomeButton is pressed, make sure that  navigate function is called", () => {
        const navigate = jest.fn();
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
        const component = NavigateHomeButton();
        render(component);

        expect(screen.getByTestId("navigationHomeButton")).toBeTruthy();
        fireEvent.click(screen.getByTestId("navigationHomeButton"));
        expect(navigate).toHaveBeenCalled();
    });
});
