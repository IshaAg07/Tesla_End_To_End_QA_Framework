package com.tesla.insurance.runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
        features = "src/test/resources/features",
        glue = {"com.tesla.insurance.tests"},
        plugin = {
                "pretty", // console output
                "html:target/cucumber-reports.html", // HTML report
                "json:target/cucumber.json" // JSON report
        },
        monochrome = true
)
public class TestRunner extends AbstractTestNGCucumberTests {
}
