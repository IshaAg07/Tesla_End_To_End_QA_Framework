
package com.tesla.insurance.tests;
import com.tesla.insurance.pages.InsurancePage;
import io.cucumber.java.en.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.Alert;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.testng.Assert.*;

import java.time.Duration;

public class InsuranceWebTests {
    private WebDriver driver;
    private InsurancePage insurancePage;
    private WebDriverWait wait;

    @Given("I open the Tesla Insurance page")
    public void i_open_the_tesla_insurance_page() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--disable-blink-features=AutomationControlled");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().maximize();
        driver.get("https://3000-wezqzvrfnvixwducmoninpdtswwofega.preview.same-app.com/");
        insurancePage = new InsurancePage(driver);
    }

    @Then("I should see the heading {string}")
    public void i_should_see_the_heading(String headingText) {
        assertTrue(insurancePage.getHeading().getText().contains(headingText));
    }

    @When("I click the Get Quote button")
    public void i_click_the_get_quote_button() {
        wait.until(ExpectedConditions.elementToBeClickable(insurancePage.getQuoteButton())).click();
    }

    @Then("I should see the popup form heading {string}")
    public void i_should_see_the_popup_form_heading(String popupText) {
        wait.until(ExpectedConditions.visibilityOf(insurancePage.getPopupHeading()));
        assertTrue(insurancePage.getPopupHeading().getText().contains(popupText));
    }

    @When("I fill the form with valid details and submit")
    public void i_fill_the_form_with_valid_details_and_submit() {
        insurancePage.getQuoteButton().click();
        wait.until(ExpectedConditions.visibilityOf(insurancePage.getFirstName())).sendKeys("Isha");
        insurancePage.getLastName().sendKeys("Agrawal");
        insurancePage.getEmail().sendKeys("isha@example.com");
        insurancePage.getPhone().sendKeys("9876543210");
        insurancePage.getModelDropdown().click();
        wait.until(ExpectedConditions.elementToBeClickable(insurancePage.getModelYOption())).click();
        insurancePage.getZipCode().sendKeys("94016");
        insurancePage.getSubmitButton().click();
    }

    @Then("I should see an alert with text {string}")
    public void i_should_see_an_alert_with_text(String expectedText) {
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());
        assertTrue(alert.getText().contains(expectedText));
        alert.accept();
        driver.quit();
    }
}
