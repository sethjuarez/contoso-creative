# Contoso Creative
Creative writing application for the Contoso Outdoors Company!

## API
The API is a simple Flask Application that serves up a single endpoint to generate writing samples.

## Web
The Website is a simple React Application that allows users to send API requests to the flask app.

## Resources
This application uses a variety of resources to generate writing samples. A local env file contains:

```
AZURE_OPENAI_ENDPOINT=<ENDPPOINT>
AZURE_OPENAI_API_KEY=<KEY>
BING_SEARCH_ENDPOINT=<ENDPPOINT>
BING_SEARCH_KEY=<KEY>
AI_SEARCH_ENDPOINT=<ENDPPOINT>
AI_SEARCH_KEY=<KEY>
AZURE_OPENAI_ENDPOINT_4O=<ENDPPOINT>
AZURE_OPENAI_KEY_40=<KEY>
```

The services used include:
- Azure AI Search Index - stores Contoso Outdoors Product Data
- Bing Search - used to do research
- Azure OpenAI - used to generate writing samples


## Learn More
This is a slimmed down version of a more complete application. To see see a more robust version, check out [Agent Prompty Sample](https://github.com/Azure-Samples/agent-openai-python-prompty).

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).

Resources:

- [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/)
- [Microsoft Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/)
- Contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with questions or concerns

For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Responsible AI Guidelines

This project follows below responsible AI guidelines and best practices, please review them before using this project:

- [Microsoft Responsible AI Guidelines](https://www.microsoft.com/en-us/ai/responsible-ai)
- [Responsible AI practices for Azure OpenAI models](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/overview)
- [Safety evaluations transparency notes](https://learn.microsoft.com/en-us/azure/ai-studio/concepts/safety-evaluations-transparency-note)