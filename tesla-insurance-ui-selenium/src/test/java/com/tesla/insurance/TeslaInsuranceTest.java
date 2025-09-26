package com.tesla.insurance;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;

public class TeslaInsuranceTest {

    private WebDriver driver;

    @BeforeClass
    public void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) " +
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);
        options.addArguments("--disable-blink-features=AutomationControlled");

        driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(8));
        driver.manage().window().maximize();
    }

    @Test
    public void testReplicaInsurancePageHeading() {
        // ✅ Use your deployed site
        driver.get("https://3000-wezqzvrfnvixwducmoninpdtswwofega.preview.same-app.com/");

        // Locate the Tesla Insurance heading by relative xpath
        WebElement heading = driver.findElement(By.xpath("//h1[contains(text(), 'Tesla Insurance')]"));

        System.out.println("Found heading: " + heading.getText());

        // Assertion
        Assert.assertTrue(
                heading.getText().toLowerCase().contains("tesla insurance"),
                "Heading text does not contain 'Tesla Insurance'. Actual: " + heading.getText()
        );
    }

    @Test
public void testGetQuoteButtonIsClickable() {
    // Navigate to your deployed site
    driver.get("https://3000-wezqzvrfnvixwducmoninpdtswwofega.preview.same-app.com/");

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

    // Wait for and locate the "Get Quote" button
    WebElement getQuoteButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(), 'GET QUOTE')]")));

    // Verify button is displayed and enabled
    Assert.assertTrue(getQuoteButton.isDisplayed(), "Get Quote button is not displayed");
    Assert.assertTrue(getQuoteButton.isEnabled(), "Get Quote button is not enabled");

    // Click the button
    getQuoteButton.click();

    // ✅ Wait for the popup heading instead of Thread.sleep
    WebElement popupHeading = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//h2[contains(text(), 'Get Your Tesla Insurance Quote')]")));

    // Verify popup is displayed
    Assert.assertTrue(popupHeading.isDisplayed(), "Popup form did not open after clicking Get Quote button");

    System.out.println("✅ Get Quote button is clickable and popup form opened successfully");
}


@Test
public void testGetQuoteFormSubmission() throws InterruptedException {
    driver.get("https://3000-wezqzvrfnvixwducmoninpdtswwofega.preview.same-app.com/");

    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

    // Click the "Get Quote" button
    WebElement getQuoteButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(),'GET QUOTE')]")));
    getQuoteButton.click();
    Thread.sleep(1000); // 👀 pause to see popup

    // Fill First Name
    WebElement firstName = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.xpath("//input[@placeholder='Enter your first name']")));
    firstName.sendKeys("Isha");
    Thread.sleep(700); // 👀 pause after typing

    // Fill Last Name
    WebElement lastName = driver.findElement(By.xpath("//input[@placeholder='Enter your last name']"));
    lastName.sendKeys("Agrawal");
    Thread.sleep(700);

    // Fill Email
    WebElement email = driver.findElement(By.xpath("//input[@placeholder='Enter your email']"));
    email.sendKeys("isha@example.com");
    Thread.sleep(700);

    // Fill Phone Number
    WebElement phone = driver.findElement(By.xpath("//input[@placeholder='Enter your phone number']"));
    phone.sendKeys("9876543210");
    Thread.sleep(700);

    // Select Tesla Model
    WebElement modelDropdown = driver.findElement(By.xpath("//button[contains(.,'Select your Tesla model')]"));
    modelDropdown.click();
    Thread.sleep(700);

    WebElement modelOption = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//span[text()='Model Y']")));
    modelOption.click();
    Thread.sleep(700);

    // Fill ZIP Code
    WebElement zip = driver.findElement(By.xpath("//input[@placeholder='Enter your ZIP code']"));
    zip.sendKeys("94016");
    Thread.sleep(700);

    // Click "Get My Quote"
    WebElement submitButton = driver.findElement(By.xpath("//button[contains(text(),'Get My Quote')]"));
    submitButton.click();
    Thread.sleep(1000); // 👀 pause before alert

    // Wait for alert popup and validate message
    Alert alert = wait.until(ExpectedConditions.alertIsPresent());
    String alertText = alert.getText();
    System.out.println("Alert says: " + alertText);

    Assert.assertTrue(alertText.contains("Quote request submitted! Tesla will contact you shortly."),
            "Unexpected alert text: " + alertText);

    // Pause so you can read the alert before accepting
    Thread.sleep(1500);
    alert.accept();
}



    @AfterClass
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
